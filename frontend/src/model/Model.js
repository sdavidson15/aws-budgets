// This file includes converters that convert objects parsed from server responses
// into objects that are usable on the client.
//
// Note that the object passed in is basically shallow-copied. This conversion doesn't
// really convert anything so much as it ensures that the models used by the server
// are the same models used by the client.

export function NewBudget(budget) {
    var newBudget = {
        UUID: budget.UUID,
        AccountID: budget.AccountID,
        BudgetName: budget.BudgetName,
        BudgetAmount: budget.BudgetAmount,
        SuggestedBudget: budget.SuggestedBudget,
        CurrentSpend: budget.CurrentSpend,
        ForecastedSpend: budget.ForecastedSpend,
        SpendHistory: budget.SpendHistory,
        Notifications: budget.Notifications
    }
    if (Object.keys(budget).length !== Object.keys(newBudget).length) {
        console.error("Budget models do not match.");
        return {};
    }
    return newBudget;
}

// TODO: use the item's budget amount
export function NewSpendHistoryItem(item, budgetAmount) {
    var newSpendHistoryItem = {
        Date: item.Date,
        BudgetAmount: budgetAmount,
        Spend: item.Spend
    }
    if (Object.keys(item).length !== Object.keys(newSpendHistoryItem).length) {
        console.error("SpendHistoryItem models do not match.")
        return {};
    }
    return newSpendHistoryItem;
}

export function NewNotification(notification) {
    var newNotification = {
        AlertThreshold: notification.AlertThreshold,
        ThresholdType: notification.ThresholdType,
        EmailSubscribers: Notification.EmailSubscribers,
    }
    if (Object.keys(notification).length !== Object.keys(newNotification).length) {
        console.error("Notification models do not match.")
        return {};
    }
    return newNotification;
}