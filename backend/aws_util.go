package main

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

var MONTH_STRINGS = [12]string{`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`}

type awsClient struct {
	accountID          string
	region             string
	roleName           string
	cache              *cache
	budgetsClient      *awsbudgets.Budgets
	costexplorerClient *awscostexplorer.CostExplorer
}

func (aws *awsClient) getBudgetHistory(budgetName string) (BudgetHistory, error) {
	budgetHistory, err := aws.cache.getBudgetHistory(aws.accountID, budgetName)
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

func newAwsClient(accountID string, region string, roleName string) *awsClient {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, roleName)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	return &awsClient{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
		cache:     &cache{},
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

func awsBudgetsToBudgets(accountID string, awsBudgets []*awsbudgets.Budget) (Budgets, error) {
	budgets := make(Budgets, 0, len(awsBudgets))
	for _, awsBudget := range awsBudgets {
		budget, err := awsBudgetToBudget(accountID, awsBudget)
		if err != nil {
			return Budgets{}, err
		}
		if budget.AccountID == `` {
			continue
		}

		budgets = append(budgets, budget)
	}

	return budgets, nil
}

func awsBudgetToBudget(accountID string, awsBudget *awsbudgets.Budget) (Budget, error) {
	if awsBudget == nil || awsBudget.BudgetLimit == nil || awsBudget.BudgetLimit.Amount == nil ||
		awsBudget.CalculatedSpend == nil || awsBudget.CalculatedSpend.ActualSpend == nil ||
		awsBudget.CalculatedSpend.ActualSpend.Amount == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend.Amount == nil {
		log.Printf("[WARN] AWS Budget in account %s is unprocessable: %+v", accountID, awsBudget)
		return Budget{}, nil
	}

	budgetAmount, err := strconv.ParseFloat(*awsBudget.BudgetLimit.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	currentSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ActualSpend.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	forecastedSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ForecastedSpend.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	return Budget{
		AccountID:       accountID,
		BudgetName:      *awsBudget.BudgetName,
		BudgetAmount:    budgetAmount,
		CurrentSpend:    currentSpend,
		ForecastedSpend: forecastedSpend,
		BudgetHistory:   BudgetHistory{},
	}, nil
}

func awsResultsByTimeToBudgetHistory(results []*awscostexplorer.ResultByTime) (BudgetHistory, error) {
	budgetHistory := make(BudgetHistory, len(results))
	for i, res := range results {
		budgetHistoryItem, err := awsResultByTimeToBudgetHistoryItem(res)
		if err != nil {
			return BudgetHistory{}, err
		}

		budgetHistory[i] = budgetHistoryItem
	}

	return budgetHistory, nil
}

func awsResultByTimeToBudgetHistoryItem(res *awscostexplorer.ResultByTime) (BudgetHistoryItem, error) {
	amount, err := strconv.ParseFloat(*res.Total[`UnblendedCost`].Amount, 64)
	if err != nil {
		return BudgetHistoryItem{}, err
	}
	yearStr := (*res.TimePeriod.Start)[:4]
	monthNum, err := strconv.Atoi((*res.TimePeriod.Start)[5:7])
	if err != nil {
		return BudgetHistoryItem{}, nil
	}
	monthStr := MONTH_STRINGS[monthNum-1]
	dateStr := fmt.Sprintf("%s %s", monthStr, yearStr)

	return BudgetHistoryItem(map[string]float64{dateStr: amount}), nil
}

func makeStringPointer(str string) *string {
	return &str
}

func makeInt64Pointer(n int64) *int64 {
	return &n
}
