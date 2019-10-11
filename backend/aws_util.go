package main

import (
	"fmt"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

type awsClient struct {
	accountID string
	region    string
	roleName  string
	// cache              *cache
	budgetsClient      *awsbudgets.Budgets
	costexplorerClient *awscostexplorer.CostExplorer
}

func (aws *awsClient) getBudgetHistory(budgetName string) ([]BudgetHistoryItem, error) {
	// return aws.cache.getBudgetHistory(aws.accountID, budgetName)
	return []BudgetHistoryItem{}, nil
}

func (aws *awsClient) updateBudget(budgetName string, budgetAmount float64) error {
	// return aws.cache.updateBudget(aws.accountID, budgetName, budgetAmount)
	return nil
}

func (aws *awsClient) getBudgets() (Budgets, error) {
	// budgets, err := aws.cache.getBudgets(aws.accountID)
	// if err != nil {
	// 	return Budgets{}, err
	// }
	// if len(budgets) > 0 {
	// 	return budgets, nil
	// }

	var maxResults int64 = 100
	input := &awsbudgets.DescribeBudgetsInput{
		AccountId:  &aws.accountID,
		MaxResults: &maxResults,
	}

	budgets := []*awsbudgets.Budget{}
	for {
		output, err := aws.budgetsClient.DescribeBudgets(input)
		if err != nil {
			return Budgets{}, err
		}

		budgets = append(budgets, output.Budgets...)
		input.NextToken = output.NextToken
		if input.NextToken == nil {
			break
		}
	}

	return awsBudgetsToBudgets(aws.accountID, budgets)
}

func newAwsClient(accountID string, region string, roleName string) *awsClient {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, roleName)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	return &awsClient{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
		// cache:     &cache{},
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

func newMockAwsClient(accountID string, region string, roleName string) *awsClient {
	return &awsClient{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
		// cache:     &cache{},
	}
}

func awsBudgetsToBudgets(accountID string, awsBudgets []*awsbudgets.Budget) (Budgets, error) {
	budgets := make(Budgets, len(awsBudgets))
	for i, awsBudget := range awsBudgets {
		budget, err := awsBudgetToBudget(accountID, awsBudget)
		if err != nil {
			return Budgets{}, err
		}

		budgets[i] = budget
	}

	return budgets, nil
}

func awsBudgetToBudget(accountID string, awsBudget *awsbudgets.Budget) (Budget, error) {
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
		BudgetHistory:   []BudgetHistoryItem{},
	}, nil
}
