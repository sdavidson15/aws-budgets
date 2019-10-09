package main

import (
	"net/http"
	"sync"
)

type route struct {
	name        string
	method      string
	pattern     string
	handlerFunc http.HandlerFunc
}

type routes []route

func restRoutes() routes { // TODO: make this a const
	return routes{
		route{`Get account budgets`, `GET`, `/accountbudgets`, getAccountBudgetsHandler},
	}
}

func getAccountBudgetsHandler(w http.ResponseWriter, r *http.Request) {
	var wg sync.WaitGroup
	wg.Add(len(accountList))
	budgetsToFlatten := make([]Budgets, len(accountList))

	for i, acctID := range accountList {
		go func(index int, accountID string) {
			defer wg.Done()

			// TODO: don't use mock util
			awsUtil := newMockAwsUtil(accountID, DEFAULT_REGION, DEFAULT_ROLE_NAME)
			budgets, err := awsUtil.getBudgets(accountID)
			if err != nil {
				// TODO: need a threadsafe error
				panic(err)
			}

			for j, budget := range budgets {
				budgetHistory, err := awsUtil.getBudgetHistory(budget.AccountID, budget.BudgetName)
				if err != nil {
					// TODO: need a threadsafe error
					panic(err)
				}

				budgets[j].BudgetHistory = budgetHistory
			}

			budgetsToFlatten[index] = budgets
		}(i, acctID)
	}

	wg.Wait()

	accountBudgets := Budgets{}
	for _, budgets := range budgetsToFlatten {
		accountBudgets = append(accountBudgets, budgets...)
	}

	sendResponse(w, r, accountBudgets, http.StatusOK)
}
