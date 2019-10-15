var AppState = (function () {
    // TODO: don't capitalize private vars
    // TODO: instead of holding individual fields like BudgetAmount, just hold a copy of the current budget.
    var AccountBudgets,
        AccountID,
        AlertEmails,
        AlertThreshold,
        BudgetAmount,
        BudgetHistory,
        BudgetName,
        CurrentSpend,
        CurrentReport,
        ForecastedSpend,
        LoadingAccountBudgets=false,
        ReportBody,
        Reports,
        SuggestedBudget,

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
        GetCurrentReport = function () {
            return CurrentReport;
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
        GetReportBody = function () {
            return ReportBody.slice(0);
        },
        GetReports = function () {
            if (typeof Reports === 'undefined') return [];
            return Reports.slice(0);
        },
        GetSuggestedBudget = function () {
            return SuggestedBudget;
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
        SetCurrentReport = function (report) {
            CurrentReport = report;
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
        SetReportBody = function (body) {
            ReportBody = body.slice(0);
        },
        SetReports = function (reports) {
            Reports = reports.slice(0);
        },
        SetSuggestedBudget = function (suggested) {
            SuggestedBudget = suggested;
        },

        init = function (dummy) {
            AlertEmails = (dummy) ? ['dummy.mock@email.com', 'mock.dummy@email.com'] : [];
            AlertThreshold = (dummy) ? 90 : -1;
            Reports = (dummy) ? [
                {id: 0, date: '10-15-2019', name: 'Budget Alert - Full Year 2019', reportType: 'Annual'},
                {id: 1, date: '10-15-2019', name: 'Budget Alert - October 2019', reportType: 'Monthly'},
                {id: 2, date: '09-30-2019', name: 'Budget Alert - September 2019', reportType: 'Monthly'},
                {id: 3, date: '12-31-2018', name: 'Budget Alert - Full Year 2018', reportType: 'Annual'},
            ] : [];
            ReportBody = (dummy) ? [
                { accountID: '12846281936', accountLabel: 'io-example', budgeted: 1200, alertCount: 1, spend: 1231.37 }
            ] : [];

            // TODO: when you're no longer doing dummy stuff, remove this init.
            AccountID = '';
            BudgetAmount = -1;
            BudgetHistory = [];
            BudgetName = '';
            CurrentSpend = -1;
            ForecastedSpend = -1;
            SuggestedBudget = -1;
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
        CurrentReport: GetCurrentReport,
        CurrentSpend: GetCurrentSpend,
        ForecastedSpend: GetForecastedSpend,
        LoadingAccountBudgets: GetLoadingAccountBudgets,
        ReportBody: GetReportBody,
        Reports: GetReports,
        SuggestedBudget: GetSuggestedBudget,

        // Setters TODO: idea, setters take a package name. Only files within this package can change state.
        SetAccountBudgets: SetAccountBudgets,
        SetAccountID: SetAccountID,
        SetBudgetAmount: SetBudgetAmount,
        SetBudgetHistory: SetBudgetHistory,
        SetBudgetName: SetBudgetName,
        SetCurrentSpend: SetCurrentSpend,
        SetCurrentReport: SetCurrentReport,
        SetForecastedSpend: SetForecastedSpend,
        SetLoadingAccountBudgets: SetLoadingAccountBudgets,
        SetReportBody: SetReportBody,
        SetReports: SetReports,
        SetSuggestedBudget: SetSuggestedBudget
    };
}());

export default AppState;