var AppState = (function () {
    // TODO: don't capitalize private vars
    var AccountBudgets,
        AccountID,
        AlertEmails,
        AlertThreshold,
        BudgetAmount,
        BudgetHistory,
        BudgetName,
        CurrentSpend,
        ForecastedSpend,
        LoadingAccountBudgets=false,

        // Getters
        GetAccountBudgets = function () {
            if (typeof AccountBudgets === 'undefined') return [];
            return AccountBudgets.slice(0);
        },
        GetAccountID = function () {
            return AccountID;
        },
        GetAlertEmails = function () {
            return AlertEmails.slice(0);
        },
        GetAlertThreshold = function () {
            return AlertThreshold;
        },
        GetBudgetAmount = function () {
            return BudgetAmount;
        },
        GetBudgetHistory = function () {
            if (typeof BudgetHistory === 'undefined') return [];
            return BudgetHistory.slice(0);
        },
        GetBudgetName = function () {
            return BudgetName;
        },
        GetCurrentSpend = function () {
            return CurrentSpend;
        },
        GetForecastedSpend = function () {
            return ForecastedSpend;
        },
        GetLoadingAccountBudgets = function () {
            return LoadingAccountBudgets;
        },

        // Setters
        SetAccountBudgets = function (accountBudgets) {
            AccountBudgets = accountBudgets.slice(0);
        },
        SetAccountID = function (accountId) {
            AccountID = accountId;
        },
        SetBudgetAmount = function (budgetAmount) {
            BudgetAmount = budgetAmount;
        },
        SetBudgetHistory = function (budgetHistory) {
            BudgetHistory = budgetHistory.slice(0);
        },
        SetBudgetName = function (budgetName) {
            BudgetName = budgetName;
        },
        SetCurrentSpend = function (spend) {
            CurrentSpend = spend;
        },
        SetForecastedSpend = function (spend) {
            ForecastedSpend = spend;
        },
        SetLoadingAccountBudgets = function (status) {
            LoadingAccountBudgets = status;
        },

        init = function (dummy) {
            AlertEmails = (dummy) ? ['dummy.mock@email.com', 'mock.dummy@email.com'] : [];
            AlertThreshold = (dummy) ? 90 : -1;
            AccountID = '';
            BudgetAmount = -1;
            BudgetHistory = [];
            BudgetName = '';
            CurrentSpend = -1;
            ForecastedSpend = -1;
        };

    return {
        init: init,

        // Getters
        AccountBudgets: GetAccountBudgets,
        AccountID: GetAccountID,
        AlertEmails: GetAlertEmails,
        AlertThreshold: GetAlertThreshold,
        BudgetAmount: GetBudgetAmount,
        BudgetHistory: GetBudgetHistory,
        BudgetName: GetBudgetName,
        CurrentSpend: GetCurrentSpend,
        ForecastedSpend: GetForecastedSpend,
        LoadingAccountBudgets: GetLoadingAccountBudgets,

        // Setters TODO: idea, setters take a package name. Only files within this package can change state.
        SetAccountBudgets: SetAccountBudgets,
        SetAccountID: SetAccountID,
        SetBudgetAmount: SetBudgetAmount,
        SetBudgetHistory: SetBudgetHistory,
        SetBudgetName: SetBudgetName,
        SetCurrentSpend: SetCurrentSpend,
        SetForecastedSpend: SetForecastedSpend,
        SetLoadingAccountBudgets: SetLoadingAccountBudgets
    };
}());

export default AppState;