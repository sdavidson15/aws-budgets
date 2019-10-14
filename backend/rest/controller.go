package rest

import (
	"fmt"
	"sync"
	"time"

	"aws-budgets/backend/aws"
	"aws-budgets/backend/model"
	"aws-budgets/backend/util"
)

type Controller struct {
	acache *aws.AwsClientCache
}

func (c *Controller) getAccountBudgets() (model.Budgets, error) {
	var wg sync.WaitGroup
	wg.Add(len(accountList))
	terr := util.NewThreadSafeError()

	budgetsToFlatten := make([]model.Budgets, len(accountList))
	batchSize := 50          // batch by 50 to avoid getting rate limited
	batchWait := time.Second // wait 1 second after each batch

	for i, acctID := range accountList {
		go func(index int, accountID string) {
			defer wg.Done()

			awsClient := aws.NewAwsClient(accountID, DEFAULT_REGION, DEFAULT_ROLE_NAME, c.acache)
			budgets, err := awsClient.GetBudgets()
			if err != nil {
				terr.Set(err)
			}

			budgetHistory, err := awsClient.GetBudgetHistory()
			if err != nil {
				terr.Set(err)
			}

			for j, _ := range budgets {
				budgets[j].BudgetHistory = budgetHistory
			}

			budgetsToFlatten[index] = budgets
		}(i, acctID)

		if (i+1)%batchSize == 0 {
			time.Sleep(batchWait)
		}
	}

	wg.Wait()

	if err := terr.Get(); err != nil {
		return model.Budgets{}, err
	}

	accountBudgets := model.Budgets{}
	for _, budgets := range budgetsToFlatten {
		accountBudgets = append(accountBudgets, budgets...)
	}

	return accountBudgets, nil
}

func (c *Controller) updateAccountBudgets(newBudgets model.Budgets) error {
	oldBudgets, err := c.getAccountBudgets()
	if err != nil {
		return err
	}

	oldBudgetsMap := make(map[string]model.Budget, len(oldBudgets))
	for _, b := range oldBudgets {
		oldBudgetsMap[b.AccountID+b.BudgetName] = b
	}

	var wg sync.WaitGroup
	wg.Add(len(newBudgets))
	terr := util.NewThreadSafeError()

	for _, nb := range newBudgets {
		go func(newBudget model.Budget) {
			defer wg.Done()

			oldBudget, ok := oldBudgetsMap[newBudget.AccountID+newBudget.BudgetName]
			if !ok || budgetsEqual(newBudget, oldBudget) {
				return
			}

			awsClient := aws.NewAwsClient(newBudget.AccountID, DEFAULT_REGION, DEFAULT_ROLE_NAME, c.acache)
			if newBudget.BudgetName != oldBudget.BudgetName {
				// TODO: rename the budget, then finish the update. Just returning for now
				// TODO: handle renaming a budget to an existing budget name. That could get nasty
				// since this is multithreaded.
				terr.Set(fmt.Errorf(`Renaming a budget is not yet implemented.`))
				return
			}

			err := awsClient.UpdateBudget(newBudget.BudgetName, newBudget.BudgetAmount)
			if err != nil {
				terr.Set(err)
			}
		}(nb)
	}

	wg.Wait()
	return terr.Get()
}

func (c *Controller) Init() error {
	// To init, run a get to populate the AwsClientCache
	_, err := c.getAccountBudgets()
	return err
}

func NewController(acache *aws.AwsClientCache) *Controller {
	return &Controller{
		acache: acache,
	}
}

func budgetsEqual(b, other model.Budget) bool {
	return b.AccountID == other.AccountID &&
		b.BudgetName == other.BudgetName &&
		b.BudgetAmount == other.BudgetAmount
}
