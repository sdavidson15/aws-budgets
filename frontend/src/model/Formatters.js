const defaultCurrency = '$';

export function FormatAccountBudgetsData(id, accountId, name, budgetAmount, suggestedBudget, currentSpend, forecastedSpend, budgetHistory) {
    return { id, accountId, name, budgetAmount, suggestedBudget, currentSpend, forecastedSpend, budgetHistory };
}

export function FormatAccountBudgetsUploadData(AccountID, BudgetName, BudgetAmount, CurrentSpend, ForecastedSpend, BudgetHistory = []) {
    return { AccountID, BudgetName, BudgetAmount, CurrentSpend, ForecastedSpend, BudgetHistory };
}

export function FormatBudgetHistoryData(id, date, actual, budgeted, variance, varianceDescr) {
    return { id, date, actual, budgeted, variance, varianceDescr };
}

export function FormatChartData(data) {
    data.reverse(); // Read left to right chronologically
    data.pop(); // Don't include current month
    return data.map(function (row) {
        return FormatChartDataRow(row.date, row.actual, row.budgeted);
    });
}

export function FormatChartDataRow(date, actual, budgeted) {
    var month = date.substring(0, 3),
        year = date.substring(date.length - 2, date.length);

    date = month.concat(" ", year);
    return { date, actual, budgeted };
}

export function FormatSpend(spend, budgetAmount) {
    var spendString = NumToCurrencyString(spend);
    var spendPercent = NumToPercentString(spend, budgetAmount);
    return spendString.concat('\t(', spendPercent, ' of budgeted)');
}

export function FormatVarianceDescription(budgetAmount, spend) {
    var variance = budgetAmount - spend;
    var spendPercent = NumToPercentString(variance, budgetAmount, true);
    var overUnder = (variance < 0) ? 'over' : 'under';
    return spendPercent.concat(' ', overUnder, ' budget');
}

export function NumToCurrencyString(num) {
    // TODO: use an outside formatter like https://flaviocopes.com/how-to-format-number-as-currency-javascript/
    if (num < 0) {
        var negativeSign = '-';
        num *= -1;
        return negativeSign.concat(defaultCurrency, num.toFixed(2).toString());
    }
    return defaultCurrency.concat(num.toFixed(2).toString());
}

export function NumToPercentString(num, divisor, abs = false) {
    var percent = (num / divisor) * 100;
    if (abs) percent = Math.abs(percent);
    return percent.toFixed(2).toString().concat('%');
}