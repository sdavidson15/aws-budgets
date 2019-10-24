package cache

import (
	"aws-budgets/backend/model"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"sync"
)

const PATH_SEPARATOR string = "/"

type Cache struct {
	locks map[string]*sync.RWMutex // account ID to RWMutex for account budgets files
}

func NewCache() *Cache {
	return &Cache{
		locks: map[string]*sync.RWMutex{},
	}
}

func (c *Cache) CacheBudgets(accountID string, budgets model.Budgets) error {
	// Create a new lock for this account's file
	lock := sync.RWMutex{}
	c.locks[accountID] = &lock

	lock.Lock()
	defer lock.Unlock()

	// Remove any existing file of the same
	// name and write the budgets to the file
	filepath, err := c.getFilePath(accountID)
	if err != nil {
		return err
	}
	return c.writeFile(filepath, budgets)
}

func (c *Cache) GetBudgets(accountID string) (model.Budgets, error) {
	// Check if a lock exists for this account. If it doesn't,
	// then the specified account's budgets have not been cached.
	lock, ok := c.locks[accountID]
	if !ok {
		return model.Budgets{}, nil
	}

	lock.RLock()
	defer lock.RUnlock()

	// Read the budgets as bytes from the file
	filePath, err := c.getFilePath(accountID)
	if err != nil {
		return model.Budgets{}, err
	}
	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		return model.Budgets{}, err
	}

	// Convert the bytes into Budget models
	var budgets model.Budgets
	json.Unmarshal(bytes, &budgets)
	return budgets, nil
}

func (c *Cache) UpdateBudget(accountID string, budget *model.Budget) error {
	// Check if a lock exists for this account. If it doesn't,
	// then the specified account's budgets have not been cached.
	lock, ok := c.locks[accountID]
	if !ok {
		return fmt.Errorf("Cache lock for account %s does not exist.", accountID)
	}

	lock.Lock()
	defer lock.Unlock()

	// Get existing budgets as Budget models
	existing, err := c.GetBudgets(accountID)
	if err != nil {
		return err
	}

	// Write changes to existing Budget models
	for i, old := range existing {
		if old.UUID == budget.UUID {
			existing[i] = budget
			break
		}
	}

	// Remove the existing file and rewrite it with the updates
	filePath, err := c.getFilePath(accountID)
	if err != nil {
		return err
	}
	if err := os.Remove(filePath); err != nil {
		return err
	}
	return c.writeFile(filePath, existing)
}

func (c *Cache) writeFile(filePath string, data interface{}) error {
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

func (c *Cache) getFilePath(accountID string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%s%sstorage%scache%saccountbudgets%s%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
	), nil
}
