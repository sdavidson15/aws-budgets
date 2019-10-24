package storage

import (
	"aws-budgets/backend/model"
	"aws-budgets/backend/storage/aws"
	"aws-budgets/backend/storage/cache"
	"log"
	"sync"
	"time"
)

type Storage struct {
	cache          *cache.Cache
	watchedBudgets map[string]model.BudgetMetas
}

func NewStorageWithCache() *Storage {
	return &Storage{
		cache: cache.NewCache(),
	}
}

func (s *Storage) GetBudgets(skipCache bool) (model.Budgets, error) {
	// Use a goroutine per account to gather budgets data
	var wg sync.WaitGroup
	wg.Add(len(s.watchedBudgets))
	terr := model.NewThreadSafeError()

	// Collect the budgets in a mapping of accountID to budgets
	budgetsMap := model.NewThreadSafeMap()

	count := 0
	for account, budgetMetas := range s.watchedBudgets {
		if count >= aws.MAX_BATCH_SIZE {
			count = 0
			time.Sleep(time.Second)
		}
		count++

		go func(accountID string, budgeMetas model.BudgetMetas) {
			defer wg.Done()

			// Check to see if the cache already has these budgets
			if !skipCache {
				budgets, err := s.cache.GetBudgets(accountID)
				if err != nil {
					terr.Set(err)
					return
				}

				if len(budgets) > 0 {
					budgetsMap.Set(accountID, budgets)
					return
				}
			}

			// Budgets weren't cached, need to retrieve from AWS
			budgets, err := aws.NewAwsClient(accountID).GetBudgets(accountID, budgetMetas)
			if err != nil {
				terr.Set(err)
				return
			}

			budgetsMap.Set(accountID, budgets)
		}(account, budgetMetas)
	}

	wg.Wait()
	if err := terr.Get(); err != nil {
		return model.Budgets{}, err
	}

	// Flatten the budgets map into a list
	budgets := model.Budgets{}
	for _, accountID := range budgetsMap.Keys() {
		accountBudgets := budgetsMap.Get(accountID).(model.Budgets)
		budgets = append(budgets, accountBudgets...)
	}
	return budgets, nil
}

func (s *Storage) RenameBudget(accountID string, budget *model.Budget) error {
	// Get the old name of the budget
	var oldBudgetName string
	for _, meta := range s.watchedBudgets[accountID] {
		if meta.UUID == budget.UUID {
			oldBudgetName = meta.BudgetName
			break
		}
	}

	// Rename the budget in AWS Budgets and AWS Dynamo DB
	if err := aws.NewAwsClient(accountID).RenameBudget(accountID, budget, oldBudgetName); err != nil {
		return err
	}

	// Rename the budget in the cache
	if err := s.cache.UpdateBudget(accountID, budget); err != nil {
		return err
	}

	// Rename the budget in the watched budgets
	for i, meta := range s.watchedBudgets[accountID] {
		if meta.UUID == budget.UUID {
			s.watchedBudgets[accountID][i].BudgetName = budget.BudgetName
			break
		}
	}

	return nil
}

func (s *Storage) PopulateCache() error {
	// Get watched budget names from AWS Dynamo DB
	watchedBudgets, err := aws.NewAwsClient(aws.DEFAULT_ACCOUNT).GetWatchedBudgets()
	if err != nil {
		return err
	}
	s.watchedBudgets = watchedBudgets

	// Get watched budgets from AWS Budgets and AWS Cost Explorer
	budgets, err := s.GetBudgets(true)
	if err != nil {
		return err
	}

	// Map budgets by account ID
	budgetsMap := map[string]model.Budgets{}
	for _, budget := range budgets {
		if _, ok := budgetsMap[budget.AccountID]; ok {
			budgetsMap[budget.AccountID] = model.Budgets{}
		}
		budgetsMap[budget.AccountID] = append(budgetsMap[budget.AccountID], budget)
	}

	// Populate the cache
	for accountID, budgets := range budgetsMap {
		if err = s.cache.CacheBudgets(accountID, budgets); err != nil {
			log.Printf("[ERROR] Failed to cache budgets for account %s: %s", err.Error())
		}
	}

	return nil
}

func (s *Storage) UpdateBudgets(accountID string, budgets model.Budgets) error {
	awsClient := aws.NewAwsClient(accountID)
	for _, budget := range budgets {
		// Update the budget in AWS Budgets and AWS Dynamo DB
		if err := awsClient.UpdateBudget(accountID, budget); err != nil {
			return err
		}

		// Update the budget in the cache
		if err := s.cache.UpdateBudget(accountID, budget); err != nil {
			return err
		}
	}

	return nil
}
