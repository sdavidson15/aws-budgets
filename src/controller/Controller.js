import AppState from './State';
import Formatters from './../model/Formatters';
import RestApp from './Rest';

var Controller = (function () {
    var LoadAccountBudgets = function () {
        var accountBudgets = RestApp.GetAccountBudgets(),
            budgets = [];

        for (var i = 0; i < accountBudgets.length; i++) {
            var b = accountBudgets[i];
            var data = Formatters.formatAccountBudgetsData(i, b.AccountId, b.BudgetName, b.BudgetAmount, b.CurrentSpend, b.ForecastedSpend, b.BudgetHistory);
            budgets.push(data);
        }

        AppState.SetAccountBudgets(budgets);
    },

        LoadBudget = function (accountId, budgetName) {
            var accountBudgets = AppState.AccountBudgets(),
                index = 0,
                budgetHistory = [],
                budget;

            while (index < accountBudgets.length) {
                budget = accountBudgets[index];
                if (budget.AccountId === accountId && budget.BudgetName === budgetName) break;
                index++;
            }
            if (index >= accountBudgets.length)
                alert('Error: could not find budget.');

            for (var i = 0; i < budget.BudgetHistory.length; i++) {
                var id = budget.BudgetHistory.length - i,
                    bh = budget.BudgetHistory[i],
                    date;

                for (var d in bh)
                    date = d;
                if (typeof date === 'undefined')
                    alert('Error: could not retrieve date from budget history item.');

                var varianceDescr = Formatters.formatVarianceDescription(budget.budgetAmount, bh[date]);
                var data = Formatters.formatBudgetHistoryData(id, date, budget.currentSpend, budget.budgetAmount, budget.budgetAmount - bh[date], varianceDescr);
                budgetHistory.push(data);
            }

            // Push month-to-date (MTD) data
            var variance = budget.budgetAmount - budget.currentSpend;
            var descr = Formatters.formatVarianceDescription(budget.budgetAmount, budget.currentSpend);
            budgetHistory.push(Formatters.formatBudgetHistoryData(0, 'Oct 2019 (MTD)', budget.currentSpend, budget.budgetAmount, variance, descr)); // TODO: intelligently determine current month string

            AppState.SetBudgetName(budgetName);
            AppState.SetBudgetAmount(budget.budgetAmount);
            AppState.SetBudgetHistory(budgetHistory);
            AppState.SetCurrentSpend(budget.currentSpend);
            AppState.SetForecastedSpend(budget.forecastedSpend);
        },

        init = function () {
            AppState.init();
            LoadAccountBudgets();
        };

    return {
        init: init,
        LoadAccountBudgets: LoadAccountBudgets,
        LoadBudget: LoadBudget
    };
}());

export default Controller;