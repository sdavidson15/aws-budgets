var Formatters = (function () {
    var defaultCurrency = '$',

        formatAccountBudgetsData = function (id, accountId, name, budgetAmount, currentSpend, forecastedSpend, budgetHistory) {
            return { id, accountId, name, budgetAmount, currentSpend, forecastedSpend, budgetHistory };
        },

        formatAccountBudgetsUploadData = function (AccountID, BudgetName, BudgetAmount, CurrentSpend, ForecastedSpend, BudgetHistory = []) {
            return { AccountID, BudgetName, BudgetAmount, CurrentSpend, ForecastedSpend, BudgetHistory };
        },

        formatBudgetHistoryData = function (id, date, actual, budgeted, variance, varianceDescr) {
            return { id, date, actual, budgeted, variance, varianceDescr };
        },

        formatChartData = function (data) {
            data.reverse(); // Read left to right chronologically
            data.pop(); // Don't include current month
            return data.map(function (row) {
                return formatChartDataRow(row.date, row.actual, row.budgeted);
            });
        },

        formatChartDataRow = function (date, actual, budgeted) {
            var month = date.substring(0, 3),
                year = date.substring(date.length - 2, date.length);

            date = month.concat(" ", year);
            return { date, actual, budgeted };
        },

        formatSpend = function (spend, budgetAmount) {
            var spendString = numToCurrencyString(spend);
            var spendPercent = numToPercentString(spend, budgetAmount);
            return spendString.concat('\t(', spendPercent, ' of budgeted)');
        },

        formatVarianceDescription = function (budgetAmount, spend) {
            var variance = budgetAmount - spend;
            var spendPercent = numToPercentString(variance, budgetAmount, true);
            var overUnder = (variance < 0) ? 'over' : 'under';
            return spendPercent.concat(' ', overUnder, ' budget');
        },

        numToCurrencyString = function (num) {
            // TODO: use an outside formatter like https://flaviocopes.com/how-to-format-number-as-currency-javascript/
            if (num < 0) {
                var negativeSign = '-';
                num *= -1;
                return negativeSign.concat(defaultCurrency, num.toFixed(2).toString());
            }
            return defaultCurrency.concat(num.toFixed(2).toString());
        },

        numToPercentString = function (num, divisor, abs = false) {
            var percent = (num / divisor) * 100;
            if (abs) percent = Math.abs(percent);
            return percent.toFixed(2).toString().concat('%');
        };

    return {
        formatAccountBudgetsData: formatAccountBudgetsData,
        formatAccountBudgetsUploadData: formatAccountBudgetsUploadData,
        formatBudgetHistoryData: formatBudgetHistoryData,
        formatChartData: formatChartData,
        formatSpend: formatSpend,
        formatVarianceDescription: formatVarianceDescription,
        numToCurrencyString: numToCurrencyString
    }
}());

export default Formatters;