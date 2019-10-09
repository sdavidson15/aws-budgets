var AppState = (function () {
    // TODO: don't capitalize private vars
    var AccountBudgets,
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

        init = function () {
            // TODO: just get rid of init
            AlertEmails = ['dummy.mock@email.com', 'mock.dummy@email.com'];
            AlertThreshold = 90;
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
        SetBudgetAmount: SetBudgetAmount,
        SetBudgetHistory: SetBudgetHistory,
        SetBudgetName: SetBudgetName,
        SetCurrentSpend: SetCurrentSpend,
        SetForecastedSpend: SetForecastedSpend,
        SetLoadingAccountBudgets: SetLoadingAccountBudgets
    };
}());

export default AppState;