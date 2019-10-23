package aws

import (
	"aws-budgets/backend/model"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
)

type budgetsClient struct {
	client *awsbudgets.Budgets
}

func newBudgetsClient(session *session.Session, roleCreds *credentials.Credentials) *budgetsClient {
	return &budgetsClient{
		client: awsbudgets.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(DEFAULT_REGION),
		),
	}
}

func (b *budgetsClient) DescribeBudgets(accountID string) ([]*awsbudgets.Budget, error) {
	input := &awsbudgets.DescribeBudgetsInput{
		AccountId:  &accountID,
		MaxResults: model.MakeInt64Pointer(100),
	}

	budgets := []*awsbudgets.Budget{}
	for {
		log.Printf("[INFO] AWS Budgets DescribeBudgets for account: %s\n", accountID)
		output, err := b.client.DescribeBudgets(input)
		if err != nil {
			return []*awsbudgets.Budget{}, err
		}

		budgets = append(budgets, output.Budgets...)
		input.NextToken = output.NextToken
		if input.NextToken == nil {
			break
		}
	}

	return budgets, nil
}

func (b *budgetsClient) DescribeBudget(accountID, budgetName string) (*awsbudgets.Budget, error) {
	// TODO: stub
	return nil, nil
}
func (b *budgetsClient) DescribeNotificationsForBudget(accountID, budgetName string) ([]*awsbudgets.Notification, error) {
	// TODO: stub
	return []*awsbudgets.Notification{}, nil
}
func (b *budgetsClient) DescribeSubscribersForNotification(accountID, budgetName string, awsNotification *awsbudgets.Notification) ([]*awsbudgets.Subscriber, error) {
	// TODO: stub
	return []*awsbudgets.Subscriber{}, nil
}
func (b *budgetsClient) DeleteBudget(accountID, budgetName string) error {
	// TODO: stub
	return nil
}
func (b *budgetsClient) CreateBudget(accountID string, awsBudget *awsbudgets.Budget) error {
	// TODO: stub
	return nil
}

func (b *budgetsClient) UpdateBudget(accountID, budgetName string, budgetAmount float64) error {
	budget := awsbudgets.Budget{
		BudgetLimit: &awsbudgets.Spend{
			Amount: model.MakeStringPointer(fmt.Sprintf("%.2f", budgetAmount)),
			Unit:   model.MakeStringPointer(`USD`),
		},
		BudgetName: &budgetName,
		BudgetType: model.MakeStringPointer(`COST`),
		TimeUnit:   model.MakeStringPointer(`MONTHLY`),
	}
	_, err := b.client.UpdateBudget(&awsbudgets.UpdateBudgetInput{
		AccountId: &accountID,
		NewBudget: &budget,
	})
	return err
}
