package aws

import (
	"fmt"
	"log"
	"time"

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
	cache              *cache
	budgetsClient      *awsbudgets.Budgets
	costexplorerClient *awscostexplorer.CostExplorer
}

func (aws *awsClient) getBudgetHistory() (BudgetHistory, error) {
	budgetHistory, err := aws.cache.getBudgetHistory(aws.accountID)
	if err != nil {
		return BudgetHistory{}, err
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
		Granularity: makeStringPointer(`MONTHLY`),
		Metrics:     []*string{makeStringPointer(`UnblendedCost`)},
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
			return BudgetHistory{}, err
		}

		results = append(results, output.ResultsByTime...)
		input.NextPageToken = output.NextPageToken
		if input.NextPageToken == nil {
			break
		}
	}

	return awsResultsByTimeToBudgetHistory(results)
}

func (aws *awsClient) updateBudget(budgetName string, budgetAmount float64) error {
	return aws.cache.updateBudget(aws.accountID, budgetName, budgetAmount)
}

func (aws *awsClient) getBudgets() (Budgets, error) {
	budgets, err := aws.cache.getBudgets(aws.accountID)
	if err != nil {
		return Budgets{}, err
	}
	if len(budgets) > 0 {
		return budgets, nil
	}

	input := &awsbudgets.DescribeBudgetsInput{
		AccountId:  &aws.accountID,
		MaxResults: makeInt64Pointer(100),
	}

	awsBudgets := []*awsbudgets.Budget{}
	for {
		log.Printf("[INFO] AWS Budgets DescribeBudgets for account: %s\n", aws.accountID)
		output, err := aws.budgetsClient.DescribeBudgets(input)
		if err != nil {
			return Budgets{}, err
		}

		awsBudgets = append(awsBudgets, output.Budgets...)
		input.NextToken = output.NextToken
		if input.NextToken == nil {
			break
		}
	}

	return awsBudgetsToBudgets(aws.accountID, awsBudgets)
}

func newAwsClient(accountID string, region string, roleName string, cache *cache) *awsClient {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, roleName)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	if cache == nil {
		cache = &cache{}
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
