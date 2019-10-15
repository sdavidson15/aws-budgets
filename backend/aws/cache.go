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

const BUDGETS_DIRECTORY string = `accountbudgets`
const HISTORY_DIRECTORY string = `budgetHistory`

type AwsClientCache struct {
	budgetLocks    map[string]*sync.Mutex // filepath to mutex for account budgets files
	historyLocks map[string]*sync.Mutex // filepath to mutex for budget history files
	useCache bool
}

func (c *AwsClientCache) cacheBudgets(accountID string, budgets model.Budgets) error {
	lock := sync.Mutex{}
	c.budgetLocks[accountID] = &lock
	
	lock.Lock()
	defer lock.Unlock()
	
	filepath, err := c.getFilePath(accountID, BUDGETS_DIRECTORY)
	if err != nil {
		return err
	}
	
	return c.writeFile(filepath, budgets)
}

func (c *AwsClientCache) cacheBudgetHistory(accountID string, budgetHistory model.BudgetHistory) error {
	lock := sync.Mutex{}
	c.historyLocks[accountID] = &lock
	
	lock.Lock()
	defer lock.Unlock()
	
	filepath, err := c.getFilePath(accountID, HISTORY_DIRECTORY)
	if err != nil {
		return err
	}
	
	return c.writeFile(filepath, budgetHistory)
}

func (c *AwsClientCache) getBudgets(accountID string) (model.Budgets, error) {
	_, ok := c.budgetLocks[accountID]
	if !ok || !c.useCache {
		return model.Budgets{}, nil
	}

	filePath, err := c.getFilePath(accountID, BUDGETS_DIRECTORY)
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
func (c *AwsClientCache) getBudgetHistory(accountID string) (model.BudgetHistory, error) {
	_, ok := c.historyLocks[accountID]
	if !ok || !c.useCache {
		return model.BudgetHistory{}, nil
	}
	
	filepath, err := c.getFilePath(accountID, HISTORY_DIRECTORY)
	if err != nil {
		return model.BudgetHistory{}, err
	}

	bytes, err := ioutil.ReadFile(filepath)
	if err != nil {
		return model.BudgetHistory{}, err
	}

	var budgetHistory model.BudgetHistory
	json.Unmarshal(bytes, &budgetHistory)
	return budgetHistory, nil
}

func (c *AwsClientCache) updateBudget(accountID, budgetName string, budgetAmount float64) error {
	lock, ok := c.budgetLocks[accountID]
	if !ok {
		return fmt.Errorf("Cache lock for account %s does not exist.", accountID)
	}
	
	lock.Lock()
	defer lock.Unlock()
	
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
		filePath, err := c.getFilePath(accountID, BUDGETS_DIRECTORY)
		if err != nil {
			return err
		}

		if err := os.Remove(filePath); err != nil {
			return err
		}

		if err := c.writeFile(filePath, budgets); err != nil {
			return err
		}
	}

	return nil
}

func (c *AwsClientCache) writeFile(filePath string, data interface{}) error {
	bytes, err := json.Marshal(data)
	if err != nil {
		return err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	file.Close()

	return ioutil.WriteFile(filePath, bytes, 0644)
}

func (c *AwsClientCache) getFilePath(accountID, subdirectory string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%s%saws%scache%s%s%s%s.json",
		pwd,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		util.PATH_SEPARATOR,
		subdirectory,
		util.PATH_SEPARATOR,
		accountID,
	), nil
}

func NewAwsClientCache(useCache bool) *AwsClientCache {
	return &AwsClientCache{
		budgetLocks: map[string]*sync.Mutex{},
		historyLocks: map[string]*sync.Mutex{},
		useCache: useCache,
	}
}
