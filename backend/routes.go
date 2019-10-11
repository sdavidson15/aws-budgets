package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"sync"
)

const byteLimit int64 = 1048576

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
		route{`Update account budgets`, `PUT`, `/updateaccountbudgets`, updateAccountBudgetsHandler},
	}
}

func getAccountBudgetsHandler(w http.ResponseWriter, r *http.Request) {
	accountBudgets, err := getAccountBudgets()
	if err != nil {
		sendServerError(w, r, err)
		return
	}
	sendResponse(w, r, accountBudgets, http.StatusOK)
}

func updateAccountBudgetsHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, byteLimit))
	if err != nil {
		sendServerError(w, r, err)
		return
	}
	if err := r.Body.Close(); err != nil {
		sendServerError(w, r, err)
		return
	}

	var newBudgets Budgets
	if err := json.Unmarshal(body, &newBudgets); err != nil {
		sendResponse(w, r, err, http.StatusUnprocessableEntity)
		return
	}

	if err := updateAccountBudgets(newBudgets); err != nil {
		sendServerError(w, r, err)
	}

	sendResponse(w, r, "Account budgets updated.", http.StatusOK)
}

// TODO: move these to a controller layer ==========================================================
func getAccountBudgets() (Budgets, error) {
	var wg sync.WaitGroup
	wg.Add(len(accountList))
	terr := newThreadSafeError()

	budgetsToFlatten := make([]Budgets, len(accountList))
	for i, acctID := range accountList {
		go func(index int, accountID string) {
			defer wg.Done()

			awsUtil := newAwsUtil(accountID, DEFAULT_REGION, DEFAULT_ROLE_NAME)
			budgets, err := awsUtil.getBudgets(accountID)
			if err != nil {
				terr.set(err)
			}

			for j, budget := range budgets {
				budgetHistory, err := awsUtil.getBudgetHistory(budget.AccountID, budget.BudgetName)
				if err != nil {
					terr.set(err)
				}

				budgets[j].BudgetHistory = budgetHistory
			}

			budgetsToFlatten[index] = budgets
		}(i, acctID)
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

			awsUtil := newAwsUtil(newBudget.AccountID, DEFAULT_REGION, DEFAULT_ROLE_NAME)
			if newBudget.BudgetName != oldBudget.BudgetName {
				// TODO: rename the budget, then finish the update. Just returning for now
				// TODO: handle renaming a budget to an existing budget name. That could get nasty
				// since this is multithreaded.
				terr.set(fmt.Errorf(`Renaming a budget is not yet implemented.`))
				return
			}

			err := awsUtil.updateBudget(newBudget.AccountID, newBudget.BudgetName, newBudget.BudgetAmount)
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
