package aws

import (
	"fmt"
	"log"
	"time"
	
	"aws-budgets/backend/model"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

type awsClient struct {
	accountID          string
	region             string
	roleName           string
	cache              *AwsClientCache
	budgetsClient      *awsbudgets.Budgets
	costexplorerClient *awscostexplorer.CostExplorer
}

func (aws *awsClient) GetBudgets() (model.Budgets, error) {
	budgets, err := aws.cache.getBudgets(aws.accountID)
	if err != nil {
		return model.Budgets{}, err
	}
	if len(budgets) > 0 {
		return budgets, nil
	}

	input := &awsbudgets.DescribeBudgetsInput{
		AccountId:  &aws.accountID,
		MaxResults: model.MakeInt64Pointer(100),
	}

	awsBudgets := []*awsbudgets.Budget{}
	for {
		log.Printf("[INFO] AWS Budgets DescribeBudgets for account: %s\n", aws.accountID)
		output, err := aws.budgetsClient.DescribeBudgets(input)
		if err != nil {
			return model.Budgets{}, err
		}

		awsBudgets = append(awsBudgets, output.Budgets...)
		input.NextToken = output.NextToken
		if input.NextToken == nil {
			break
		}
	}

	budgets, err = model.AwsBudgetsToBudgets(aws.accountID, awsBudgets)
	if err != nil {
		return model.Budgets{}, err
	}
	
	if err = aws.cache.cacheBudgets(aws.accountID, budgets); err != nil {
		return model.Budgets{}, err
	}
	
	return budgets, nil
}

func (aws *awsClient) GetBudgetHistory() (model.BudgetHistory, error) {
	budgetHistory, err := aws.cache.getBudgetHistory(aws.accountID)
	if err != nil {
		return model.BudgetHistory{}, err
	}
	if len(budgetHistory) > 0 {
		return budgetHistory, nil
	}

	// date formatting in Go is the worst
	t := time.Now()
	year, _, _ := t.Date()
	end := fmt.Sprintf("%s", t.Format(`2006-01-02`))
	end = fmt.Sprintf("%s01", end[:len(end)-2])
	start := fmt.Sprintf("%d%s", year-1, end[4:])

	input := &awscostexplorer.GetCostAndUsageInput{
		Granularity: model.MakeStringPointer(`MONTHLY`),
		Metrics:     []*string{model.MakeStringPointer(`UnblendedCost`)},
		TimePeriod: &awscostexplorer.DateInterval{
			End:   &end,
			Start: &start,
		},
	}

	results := []*awscostexplorer.ResultByTime{}
	for {
		log.Printf("[INFO] AWS Costexplorer GetCostAndUsage for account: %s\n", aws.accountID)
		output, err := aws.costexplorerClient.GetCostAndUsage(input)
		if err != nil {
			return model.BudgetHistory{}, err
		}

		results = append(results, output.ResultsByTime...)
		input.NextPageToken = output.NextPageToken
		if input.NextPageToken == nil {
			break
		}
	}

	budgetHistory, err = model.AwsResultsByTimeToBudgetHistory(results)
	if err != nil {
		return model.BudgetHistory{}, err
	}
	
	if err := aws.cache.cacheBudgetHistory(aws.accountID, budgetHistory); err != nil {
		return model.BudgetHistory{}, err
	}
	
	return budgetHistory, nil
}

func (aws *awsClient) UpdateBudget(budgetName string, budgetAmount float64) error {
	budget := awsbudgets.Budget{
	    BudgetLimit: &awsbudgets.Spend{
		    Amount: model.MakeStringPointer(fmt.Sprint("%f", budgetAmount)),
		    Unit: model.MakeStringPointer(`USD`),
	    },
	    BudgetName: &budgetName,
	    BudgetType: model.MakeStringPointer(`COST`),
	    TimeUnit: model.MakeStringPointer(`MONTHLY`),
	}
	_, err := aws.budgetsClient.UpdateBudget(&awsbudgets.UpdateBudgetInput{
		AccountId: &aws.accountID,
		NewBudget: &budget,
	})
	if err != nil {
		return err
	}
	
	return aws.cache.updateBudget(aws.accountID, budgetName, budgetAmount)
}

func NewAwsClient(accountID string, region string, roleName string, cache *AwsClientCache) *awsClient {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, roleName)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	if cache == nil {
		cache = NewAwsClientCache(false)
	}

	return &awsClient{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
		cache:     cache,
		budgetsClient: awsbudgets.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(region),
		),
		costexplorerClient: awscostexplorer.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(region),
		),
	}
}
