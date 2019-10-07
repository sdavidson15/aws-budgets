var AppState = (function () {
    var AccountBudgets,
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
            BudgetName = '';
            BudgetAmount = -1;
            CurrentSpend = -1;
            ForecastedSpend = -1;
            BudgetHistory = [];
        };

    return {
        init: init,

        // Getters
        AccountBudgets: GetAccountBudgets,
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