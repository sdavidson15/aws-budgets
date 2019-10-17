var AppState = (function () {
    var accountBudgets = [],
        currentBudget,
        currentReport,
        loadingAccountBudgets = false,
        optimisticBudgets = {}, // Mapping of budget ID to budget
        reports,

        // Getters
        GetAccountBudgets = function (useOptimistic = true) {
            if (!useOptimistic)
                return JSON.parse(JSON.stringify(accountBudgets))

            let budgets = [];
            for (var i = 0; i < accountBudgets.length; i++) {
                let budget = accountBudgets[i];
                if (optimisticBudgets.hasOwnProperty(budget.id))
                    budgets.push(optimisticBudgets[budget.id]);
                else
                    budgets.push(budget);
            }
            budgets.reverse();

            return JSON.parse(JSON.stringify(budgets));
        },
        GetCurrentBudget = function () {
            return JSON.parse(JSON.stringify(currentBudget));
        },
        GetCurrentReport = function () {
            return JSON.parse(JSON.stringify(currentReport));
        },
        GetLoadingAccountBudgets = function () {
            return loadingAccountBudgets;
        },
        GetReports = function () {
            if (typeof reports === 'undefined') return [];
            return JSON.parse(JSON.stringify(reports));
        },

        // Setters
        SetAccountBudgets = function (budgets) {
            accountBudgets = JSON.parse(JSON.stringify(budgets));
        },
        SetCurrentBudget = function (budget) {
            currentBudget = JSON.parse(JSON.stringify(budget));
        },
        SetCurrentReport = function (report) {
            // currentReport = JSON.parse(JSON.stringify(report)); TODO: uncomment this
        },
        SetLoadingAccountBudgets = function (loading) {
            loadingAccountBudgets = loading;
        },
        SetOptimisticBudgets = function (budgets) {
            optimisticBudgets = {};
            if (budgets.length === 0)
                return;

            var copy = JSON.parse(JSON.stringify(budgets));
            for (var i = 0; i < copy.length; i++) {
                optimisticBudgets[copy[i].id] = copy[i];
            }
        },
        SetReports = function (reports) {
            reports = JSON.parse(JSON.stringify(reports));
        },

        init = function (dummy) {
            // TODO: Get rid of this init when you're done mocking things
            // alertEmails = (dummy) ? ['dummy.mock@email.com', 'mock.dummy@email.com'] : [];
            // alertThreshold = (dummy) ? 90 : -1;
            reports = (dummy) ? [
                { id: 0, date: '10-15-2019', name: 'Budget Alert - Full Year 2019', reportType: 'Annual' },
                { id: 1, date: '10-15-2019', name: 'Budget Alert - October 2019', reportType: 'Monthly' },
                { id: 2, date: '09-30-2019', name: 'Budget Alert - September 2019', reportType: 'Monthly' },
                { id: 3, date: '12-31-2018', name: 'Budget Alert - Full Year 2018', reportType: 'Annual' },
            ] : [];
            currentReport = {
                reportBody: (dummy) ? [
                    { accountID: '12846281936', accountLabel: 'io-example', budgeted: 1200, alertCount: 1, spend: 1231.37 }
                ] : []
            }
        };

    return {
        init: init,

        // Getters
        AccountBudgets: GetAccountBudgets,
        CurrentBudget: GetCurrentBudget,
        CurrentReport: GetCurrentReport,
        LoadingAccountBudgets: GetLoadingAccountBudgets,
        Reports: GetReports,

        // Setters
        SetAccountBudgets: SetAccountBudgets,
        SetCurrentBudget: SetCurrentBudget,
        SetCurrentReport: SetCurrentReport,
        SetLoadingAccountBudgets: SetLoadingAccountBudgets,
        SetOptimisticBudgets: SetOptimisticBudgets,
        SetReports: SetReports,
    };
}());

export default AppState;