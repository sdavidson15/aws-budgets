package main

import (
	"fmt"
	"log"
	"strconv"

	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

var MONTH_STRINGS = [12]string{`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`}

func awsBudgetsToBudgets(accountID string, awsBudgets []*awsbudgets.Budget) (Budgets, error) {
	budgets := make(Budgets, 0, len(awsBudgets))
	for _, awsBudget := range awsBudgets {
		budget, err := awsBudgetToBudget(accountID, awsBudget)
		if err != nil {
			return Budgets{}, err
		}
		if budget.AccountID == `` {
			continue
		}

		budgets = append(budgets, budget)
	}

	return budgets, nil
}

func awsBudgetToBudget(accountID string, awsBudget *awsbudgets.Budget) (Budget, error) {
	if awsBudget == nil || awsBudget.BudgetLimit == nil || awsBudget.BudgetLimit.Amount == nil ||
		awsBudget.CalculatedSpend == nil || awsBudget.CalculatedSpend.ActualSpend == nil ||
		awsBudget.CalculatedSpend.ActualSpend.Amount == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend.Amount == nil {
		log.Printf("[WARN] AWS Budget in account %s is unprocessable: %+v", accountID, awsBudget)
		return Budget{}, nil
	}

	budgetAmount, err := strconv.ParseFloat(*awsBudget.BudgetLimit.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	currentSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ActualSpend.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	forecastedSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ForecastedSpend.Amount, 64)
	if err != nil {
		return Budget{}, err
	}

	return Budget{
		AccountID:       accountID,
		BudgetName:      *awsBudget.BudgetName,
		BudgetAmount:    budgetAmount,
		CurrentSpend:    currentSpend,
		ForecastedSpend: forecastedSpend,
		BudgetHistory:   BudgetHistory{},
	}, nil
}

func awsResultsByTimeToBudgetHistory(results []*awscostexplorer.ResultByTime) (BudgetHistory, error) {
	budgetHistory := make(BudgetHistory, len(results))
	for i, res := range results {
		budgetHistoryItem, err := awsResultByTimeToBudgetHistoryItem(res)
		if err != nil {
			return BudgetHistory{}, err
		}

		budgetHistory[i] = budgetHistoryItem
	}

	return budgetHistory, nil
}

func awsResultByTimeToBudgetHistoryItem(res *awscostexplorer.ResultByTime) (BudgetHistoryItem, error) {
	amount, err := strconv.ParseFloat(*res.Total[`UnblendedCost`].Amount, 64)
	if err != nil {
		return BudgetHistoryItem{}, err
	}
	yearStr := (*res.TimePeriod.Start)[:4]
	monthNum, err := strconv.Atoi((*res.TimePeriod.Start)[5:7])
	if err != nil {
		return BudgetHistoryItem{}, nil
	}
	monthStr := MONTH_STRINGS[monthNum-1]
	dateStr := fmt.Sprintf("%s %s", monthStr, yearStr)

	return BudgetHistoryItem(map[string]float64{dateStr: amount}), nil
}

func makeStringPointer(str string) *string {
	return &str
}

func makeInt64Pointer(n int64) *int64 {
	return &n
}
