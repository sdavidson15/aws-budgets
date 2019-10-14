package main

import (
	"fmt"
	"sync"
	"time"
)

func getAccountBudgets() (Budgets, error) {
	var wg sync.WaitGroup
	wg.Add(len(accountList))
	terr := newThreadSafeError()

	budgetsToFlatten := make([]Budgets, len(accountList))
	batchSize := 50          // batch by 50 to avoid getting rate limited
	batchWait := time.Second // wait 1 second after each batch

	for i, acctID := range accountList {
		go func(index int, accountID string) {
			defer wg.Done()

			awsClient := newAwsClient(accountID, DEFAULT_REGION, DEFAULT_ROLE_NAME)
			budgets, err := awsClient.getBudgets()
			if err != nil {
				terr.set(err)
			}

			budgetHistory, err := awsClient.getBudgetHistory()
			if err != nil {
				terr.set(err)
			}

			for j, _ := range budgets {
				budgets[j].BudgetHistory = budgetHistory
			}

			budgetsToFlatten[index] = budgets
		}(i, acctID)

		if (i+1)%50 == 0 {
			time.Sleep(batchWait)
		}
	}

	wg.Wait()

	if err := terr.get(); err != nil {
		return Budgets{}, err
	}

	accountBudgets := Budgets{}
	for _, budgets := range budgetsToFlatten {
		accountBudgets = append(accountBudgets, budgets...)
	}

	return accountBudgets, nil
}

func updateAccountBudgets(newBudgets Budgets) error {
	oldBudgets, err := getAccountBudgets()
	if err != nil {
		return err
	}

	oldBudgetsMap := make(map[string]Budget, len(oldBudgets))
	for _, b := range oldBudgets {
		oldBudgetsMap[b.AccountID+b.BudgetName] = b
	}

	var wg sync.WaitGroup
	wg.Add(len(newBudgets))
	terr := newThreadSafeError()

	for _, nb := range newBudgets {
		go func(newBudget Budget) {
			defer wg.Done()

			oldBudget, ok := oldBudgetsMap[newBudget.AccountID+newBudget.BudgetName]
			if !ok || newBudget.equals(oldBudget) {
				return
			}

			awsClient := newAwsClient(newBudget.AccountID, DEFAULT_REGION, DEFAULT_ROLE_NAME)
			if newBudget.BudgetName != oldBudget.BudgetName {
				// TODO: rename the budget, then finish the update. Just returning for now
				// TODO: handle renaming a budget to an existing budget name. That could get nasty
				// since this is multithreaded.
				terr.set(fmt.Errorf(`Renaming a budget is not yet implemented.`))
				return
			}

			err := awsClient.updateBudget(newBudget.BudgetName, newBudget.BudgetAmount)
			if err != nil {
				terr.set(err)
			}
		}(nb)
	}

	wg.Wait()
	return terr.get()
}

func (b Budget) equals(other Budget) bool {
	return b.AccountID == other.AccountID &&
		b.BudgetName == other.BudgetName &&
		b.BudgetAmount == other.BudgetAmount
}
