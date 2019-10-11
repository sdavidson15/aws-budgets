package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"sync"
	"time"
)

type cache struct {
	locks    []sync.Mutex
	useCache bool
}

func (c *cache) getBudgets(accountID string) (Budgets, error) {
	if c.useCache {
		return Budgets{}, nil
	}

	filePath, err := c.getBudgetsFilePath(accountID)
	if err != nil {
		return Budgets{}, err
	}

	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		time.Sleep(time.Second) // Give it a second
		bytes, err = ioutil.ReadFile(filePath)
		if err != nil {
			return Budgets{}, err
		}
	}

	var budgets Budgets
	json.Unmarshal(bytes, &budgets)
	return budgets, nil
}

func (c *cache) getBudgetHistory(accountID, budgetName string) (BudgetHistory, error) {
	if c.useCache {
		return BudgetHistory{}, nil
	}

	pwd, err := os.Getwd()
	if err != nil {
		return BudgetHistory{}, err
	}

	bytes, err := ioutil.ReadFile(fmt.Sprintf(
		"%s%smockData%sbudgetHistory%s%s_%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
		budgetName,
	))
	if err != nil {
		return BudgetHistory{}, err
	}

	var budgetHistory BudgetHistory
	json.Unmarshal(bytes, &budgetHistory)
	return budgetHistory, nil
}

func (c *cache) updateBudget(accountID, budgetName string, budgetAmount float64) error {
	budgets, err := c.getBudgets(accountID)
	if err != nil {
		return err
	}

	madeChange := false
	for i, b := range budgets {
		if b.BudgetName != budgetName {
			continue
		} else if b.BudgetAmount == budgetAmount {
			break
		}

		budgets[i].BudgetAmount = budgetAmount
		madeChange = true
	}

	if madeChange {
		filePath, err := c.getBudgetsFilePath(accountID)
		if err != nil {
			return err
		}

		if err := os.Remove(filePath); err != nil {
			return err
		}

		if err := c.writeBudgetsFile(filePath, budgets); err != nil {
			return err
		}
	}

	return nil
}

func (c *cache) writeBudgetsFile(filePath string, budgets Budgets) error {
	data, err := json.Marshal(budgets)
	if err != nil {
		return err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	file.Close()

	return ioutil.WriteFile(filePath, data, 0644)
}

func (c *cache) getBudgetsFilePath(accountID string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%s%smockData%saccountbudgets%s%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
	), nil
}
