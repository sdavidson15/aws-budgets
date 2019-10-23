package controller

import (
	"aws-budgets/backend/controller/rest"
	"aws-budgets/backend/model"
	"aws-budgets/backend/storage"
)

type Controller struct {
	restApp *rest.RestApp
	storage *storage.Storage
}

func NewController() *Controller {
	c := &Controller{
		storage: storage.NewStorageWithCache(),
	}
	c.restApp = rest.NewRestApp(
		c.GetBudgets,
		c.UpdateBudgets,
	)
	return c
}

func (c *Controller) StartServer() error {
	if err := c.storage.PopulateCache(); err != nil {
		return err
	}

	c.restApp.Start()
	return nil
}

func (c *Controller) GetBudgets() (model.Budgets, error) {
	return c.storage.GetBudgets(false)
}

func (c *Controller) UpdateBudgets(updated model.Budgets) error {
	// Get existing budgets
	existing, err := c.storage.GetBudgets(false)
	if err != nil {
		return err
	}

	// Map existing budgets to their UUIDs for easy lookup
	existingMap := make(map[string]*model.Budget, len(existing))
	for _, budget := range existing {
		existingMap[budget.UUID] = budget
	}

	// Budgets with a changed name must be renamed
	// before any other updates can be processed.
	for _, new := range updated {
		old, ok := existingMap[new.UUID]
		if !ok {
			continue
		}

		if new.BudgetName != old.BudgetName {
			if err := c.storage.RenameBudget(new.AccountID, new); err != nil {
				return err
			}
		}
	}

	// Group updated budgets by account ID
	updatedMap := map[string]model.Budgets{}
	for _, new := range updated {
		if _, ok := updatedMap[new.AccountID]; !ok {
			updatedMap[new.AccountID] = model.Budgets{}
		}

		updatedMap[new.AccountID] = append(updatedMap[new.AccountID], new)
	}

	// Update the budgets by account
	for accountID, budgets := range updatedMap {
		if err := c.storage.UpdateBudgets(accountID, budgets); err != nil {
			return err
		}
	}

	return nil
}
