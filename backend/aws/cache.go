package aws

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"sync"
	"time"
	
	"aws-budgets/backend/model"
	"aws-budgets/backend/util"
)

type awsClientCache struct {
	locks    []sync.Mutex
	useCache bool
}

func (c *awsClientCache) getBudgets(accountID string) (model.Budgets, error) {
	if !c.useCache {
		return model.Budgets{}, nil
	}

	filePath, err := c.getBudgetsFilePath(accountID)
	if err != nil {
		return model.Budgets{}, err
	}

	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		time.Sleep(time.Second) // Give it a second
		bytes, err = ioutil.ReadFile(filePath)
		if err != nil {
			return model.Budgets{}, err
		}
	}

	var budgets model.Budgets
	json.Unmarshal(bytes, &budgets)
	return budgets, nil
}

// FIXME: budget history cache files should be for account, not account+budgetName combo
func (c *awsClientCache) getBudgetHistory(accountID string) (model.BudgetHistory, error) {
	if !c.useCache {
		return model.BudgetHistory{}, nil
	}

	pwd, err := os.Getwd()
	if err != nil {
		return model.BudgetHistory{}, err
	}

	budgetName := ``
	bytes, err := ioutil.ReadFile(fmt.Sprintf(
		"%s%smockData%sbudgetHistory%s%s_%s.json",
		pwd,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		accountID,
		budgetName,
	))
	if err != nil {
		return model.BudgetHistory{}, err
	}

	var budgetHistory model.BudgetHistory
	json.Unmarshal(bytes, &budgetHistory)
	return budgetHistory, nil
}

func (c *awsClientCache) updateBudget(accountID, budgetName string, budgetAmount float64) error {
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

func (c *awsClientCache) writeBudgetsFile(filePath string, budgets model.Budgets) error {
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

func (c *awsClientCache) getBudgetsFilePath(accountID string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%s%smockData%saccountbudgets%s%s.json",
		pwd,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		accountID,
	), nil
}
