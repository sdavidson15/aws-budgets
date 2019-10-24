const defaultCurrency = '$';

var monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function FormatChartData(data) {
    data.reverse(); // Read left to right chronologically
    return data.map(function (item) {
        return FormatChartDataRow(item.Date, item.Spend, item.BudgetAmount);
    });
}

export function FormatChartDataRow(date, actual, budgeted) {
    date = FormatDate(date);
    return { date, actual, budgeted };
}

export function FormatDate(date) {
    var month = monthStrings[parseInt(date.substring(5, 7))-1],
        year = date.substring(0, 4);

    return month.concat(" ", year);
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