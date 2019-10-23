package model

import (
	"log"
	"strconv"
	"time"

	awsbudgets "github.com/aws/aws-sdk-go/service/budgets"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

var MONTH_STRINGS = [12]string{`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`}

func AwsBudgetsToBudgets(accountID string, awsBudgets []*awsbudgets.Budget) (Budgets, error) {
	budgets := make(Budgets, 0, len(awsBudgets))
	for _, awsBudget := range awsBudgets {
		budget, err := AwsBudgetToBudget(accountID, awsBudget)
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

func AwsBudgetToBudget(accountID string, awsBudget *awsbudgets.Budget) (*Budget, error) {
	if awsBudget == nil || awsBudget.BudgetLimit == nil || awsBudget.BudgetLimit.Amount == nil ||
		awsBudget.CalculatedSpend == nil || awsBudget.CalculatedSpend.ActualSpend == nil ||
		awsBudget.CalculatedSpend.ActualSpend.Amount == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend == nil ||
		awsBudget.CalculatedSpend.ForecastedSpend.Amount == nil {
		log.Printf("[WARN] AWS Budget in account %s is unprocessable: %+v", accountID, awsBudget)
		return nil, nil
	}

	budgetAmount, err := strconv.ParseFloat(*awsBudget.BudgetLimit.Amount, 64)
	if err != nil {
		return nil, err
	}

	currentSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ActualSpend.Amount, 64)
	if err != nil {
		return nil, err
	}

	forecastedSpend, err := strconv.ParseFloat(*awsBudget.CalculatedSpend.ForecastedSpend.Amount, 64)
	if err != nil {
		return nil, err
	}

	return &Budget{
		AccountID:       accountID,
		BudgetName:      *awsBudget.BudgetName,
		BudgetAmount:    budgetAmount,
		CurrentSpend:    currentSpend,
		ForecastedSpend: forecastedSpend,
	}, nil
}

func AwsResultsByTimeToSpendHistory(results []*awscostexplorer.ResultByTime) (SpendHistory, error) {
	spendHistory := make(SpendHistory, len(results))
	for i, res := range results {
		spendHistoryItem, err := AwsResultByTimeToSpendHistoryItem(res)
		if err != nil {
			return SpendHistory{}, err
		}

		spendHistory[i] = spendHistoryItem
	}

	return spendHistory, nil
}

func AwsResultByTimeToSpendHistoryItem(res *awscostexplorer.ResultByTime) (*SpendHistoryItem, error) {
	amount, err := strconv.ParseFloat(*res.Total[`UnblendedCost`].Amount, 64)
	if err != nil {
		return nil, err
	}
	startDate, err := time.Parse(`2006-01-02`, *res.TimePeriod.Start)
	if err != nil {
		return nil, err
	}

	item := SpendHistoryItem(map[time.Time]float64{startDate: amount})
	return &item, nil
}

func MakeStringPointer(str string) *string {
	return &str
}

func MakeInt64Pointer(n int64) *int64 {
	return &n
}

func AwsNotificationsToNotifications(awsNotifications []*awsbudgets.Notification) (Notifications, error) {
	// TODO: stub
	return Notifications{}, nil
}

func AwsSubscribersToSubscribers(awsSubscribers []*awsbudgets.Subscriber) (Subscribers, error) {
	// TODO: stub
	return Subscribers{}, nil
}
