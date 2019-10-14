package main

type Budget struct {
	AccountID       string
	BudgetName      string
	BudgetAmount    float64
	CurrentSpend    float64
	ForecastedSpend float64
	BudgetHistory   BudgetHistory
}

type Budgets []Budget

type BudgetHistoryItem map[string]float64

type BudgetHistory []BudgetHistoryItem
