package model

import "time"

type BudgetMeta struct {
	UUID string
	AccountID string
	BudgetName string
}

type BudgetMetas []*BudgetMeta

type Budget struct {
	UUID string
	AccountID       string
	BudgetName      string
	BudgetAmount    float64
	SuggestedBudget float64
	CurrentSpend    float64
	ForecastedSpend float64
	SpendHistory   SpendHistory
	Notifications Notifications
}

type Budgets []*Budget

type SpendHistoryItem map[time.Time]float64

type SpendHistory []*SpendHistoryItem

type Notification struct {
	AlertThreshold float64
	ThresholdType string
	EmailSubscribers Subscribers
}

type Notifications []*Notification

type Subscribers []string
