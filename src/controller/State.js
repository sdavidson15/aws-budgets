var AppState = (function () {
    var BudgetName,
        BudgetAmount,
        BudgetHistory,
        CurrentSpend,
        ForecastedSpend,

        GetBudgetName = function () {
            return BudgetName;
        },

        GetBudgetAmount = function () {
            return BudgetAmount;
        },

        GetBudgetHistory = function () {
            return BudgetHistory.slice(0);
        },

        GetCurrentSpend = function () {
            return CurrentSpend;
        },

        GetForecastedSpend = function () {
            return ForecastedSpend;
        },

        init = function () {
            BudgetName = 'Monthly AWS Budget Alert io-example 012345678901';
            BudgetAmount = '$1,000';
            CurrentSpend = '$767.72\t(76.77% of budgeted)';
            ForecastedSpend = '$788.99\t(78.90% of budgeted)';

            function createBudgetHistoryData(id, date, actual, budgeted, variance, varianceDescr) {
                return { id, date, actual, budgeted, variance, varianceDescr };
            };

            BudgetHistory = [
                createBudgetHistoryData(0, 'Oct 2019 (MTD)', 0, 1000, 1000, '100% under budget'),
                createBudgetHistoryData(1, 'Sep 2019', 776.88, 1000, 223.12, '22.31% under budget'),
                createBudgetHistoryData(2, 'Aug 2019', 554.94, 1000, 445.06, '44.50% under budget'),
                createBudgetHistoryData(3, 'Jul 2019', 446.48, 1000, 553.52, '55.35% under budget'),
                createBudgetHistoryData(4, 'Jun 2019', 399.78, 1000, 600.22, '60.02% under budget'),
                createBudgetHistoryData(5, 'May 2019', 385.70, 1000, 614.30, '61.43% under budget'),
                createBudgetHistoryData(6, 'Apr 2019', 412.81, 1000, 587.19, '58.71% under budget'),
                createBudgetHistoryData(7, 'Mar 2019', 191.53, 1000, 808.47, '80.84% under budget'),
                createBudgetHistoryData(8, 'Feb 2019', 170.19, 1000, 829.81, '82.98% under budget'),
                createBudgetHistoryData(9, 'Jan 2019', 357.57, 1000, 642.43, '64.24% under budget'),
                createBudgetHistoryData(10, 'Dec 2018', 1275.56, 1000, -275.56, '27.55% over budget'),
                createBudgetHistoryData(11, 'Nov 2018', 1115.29, 1000, -115.29, '11.52% over budget'),
                createBudgetHistoryData(12, 'Oct 2018', 1341.69, 1000, -341.69, '34.16% over budget')
            ];
        };

    return {
        init: init,
        BudgetName: GetBudgetName,
        BudgetAmount: GetBudgetAmount,
        BudgetHistory: GetBudgetHistory,
        CurrentSpend: GetCurrentSpend,
        ForecastedSpend: GetForecastedSpend
    };
}());

export default AppState;