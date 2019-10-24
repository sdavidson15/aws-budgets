package aws

import (
	"aws-budgets/backend/model"
	"fmt"
	"math"

	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
)

const MAX_BATCH_SIZE int = 50

type awsClient struct {
	accountID          string
	region             string
	roleName           string
	budgetsClient      *budgetsClient
	costexplorerClient *costexplorerClient
}

func NewAwsClient(accountID string) *awsClient {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, DEFAULT_ROLE)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	return &awsClient{
		accountID:          accountID,
		region:             DEFAULT_REGION,
		roleName:           DEFAULT_ROLE,
		budgetsClient:      newBudgetsClient(session, roleCreds),
		costexplorerClient: newCostexplorerClient(session, roleCreds),
	}
}

func (aws *awsClient) GetBudgets(accountID string, budgetMetas model.BudgetMetas) (model.Budgets, error) {
	// Get the budgets and convert to Budget models
	awsBudgets, err := aws.budgetsClient.DescribeBudgets(accountID)
	if err != nil {
		return model.Budgets{}, err
	}
	allBudgets, err := model.AwsBudgetsToBudgets(accountID, awsBudgets)
	if err != nil {
		return model.Budgets{}, err
	}

	// Get the cost and usage and convert to Spend History model
	awsResultsByTime, err := aws.costexplorerClient.GetCostAndUsage(accountID)
	if err != nil {
		return model.Budgets{}, err
	}
	spendHistory, err := model.AwsResultsByTimeToSpendHistory(awsResultsByTime)
	if err != nil {
		return model.Budgets{}, err
	}

	// Attach the uuid, notifications, and spend history to each budget
	// Collect only the budgets with a corresponding meta in the given metas
	budgets := make(model.Budgets, 0, len(allBudgets))
	for _, budget := range allBudgets {

		// Determine the UUID of this budget from the given budget metas
		var uuid string
		for _, meta := range budgetMetas {
			if meta.BudgetName == budget.BudgetName {
				uuid = meta.UUID
			}
		}
		if len(uuid) == 0 {
			// This budget is not in the given metas
			continue
		}

		// Get the notifications for this budget and convert to Notification models
		awsNotifications, err := aws.budgetsClient.DescribeNotificationsForBudget(accountID, budget.BudgetName)
		if err != nil {
			return model.Budgets{}, err
		}
		notifications, err := model.AwsNotificationsToNotifications(awsNotifications)
		if err != nil {
			return model.Budgets{}, err
		}

		// Get the subscribers for each notification and convert to Subscriber models
		for j, _ := range notifications {
			awsSubscribers, err := aws.budgetsClient.DescribeSubscribersForNotification(accountID, budget.BudgetName, awsNotifications[j])
			if err != nil {
				return model.Budgets{}, err
			}
			subscribers, err := model.AwsSubscribersToSubscribers(awsSubscribers)
			if err != nil {
				return model.Budgets{}, err
			}
			notifications[j].EmailSubscribers = subscribers
		}

		// Get the suggested budget amount for this budget
		budget.SpendHistory = spendHistory
		suggestedBudget, err := aws.getSuggestedBudgetAmount(budget)
		if err != nil {
			return model.Budgets{}, err
		}

		budget.UUID = uuid
		budget.Notifications = notifications
		budget.SuggestedBudget = suggestedBudget
		budgets = append(budgets, budget)
	}

	return budgets, nil
}

func (aws *awsClient) GetWatchedBudgets() (map[string]model.BudgetMetas, error) {
	// TODO: read this from Dynamo DB rather than from config
	watchedBudgets := map[string]model.BudgetMetas{}
	for _, budget := range WATCHED_BUDGETS {
		if _, ok := watchedBudgets[budget.AccountID]; !ok {
			watchedBudgets[budget.AccountID] = model.BudgetMetas{}
		}
		watchedBudgets[budget.AccountID] = append(watchedBudgets[budget.AccountID], budget)
	}
	return watchedBudgets, nil
}

func (aws *awsClient) RenameBudget(accountID string, budget *model.Budget, oldBudgetName string) error {
	// Retrieve the AWS budget
	awsBudget, err := aws.budgetsClient.DescribeBudget(accountID, oldBudgetName)
	if err != nil {
		return err
	}

	// Delete the AWS budget
	if err := aws.budgetsClient.DeleteBudget(accountID, oldBudgetName); err != nil {
		return err
	}

	// Recreate the AWS budget with the new name
	awsBudget.BudgetName = &budget.BudgetName
	if err := aws.budgetsClient.CreateBudget(accountID, awsBudget); err != nil {
		return err
	}

	// TODO: update in Dynamo DB, rather than in config
	for i, watchedBudget := range WATCHED_BUDGETS {
		if watchedBudget.UUID == budget.UUID {
			WATCHED_BUDGETS[i].BudgetName = budget.BudgetName
		}
	}
	return nil
}

func (aws *awsClient) UpdateBudget(accountID string, budget *model.Budget) error {
	return aws.budgetsClient.UpdateBudget(accountID, budget.BudgetName, budget.BudgetAmount)
}

func (aws *awsClient) getSuggestedBudgetAmount(budget *model.Budget) (float64, error) {
	// TODO: currently I'm calculating a 3 month spend budget suggestion manually.
	// This should call a lambda that takes spend history as input and calculates
	// the suggested amount that way.

	var total float64
	for _, spend := range budget.SpendHistory[len(budget.SpendHistory)-3:] {
		total += spend.Spend
	}
	rounded := float64(((int(total/3) + 99) / 100) * 100)
	if math.Abs(rounded-budget.BudgetAmount) < 500 {
		return budget.BudgetAmount, nil
	}
	return rounded, nil
}
