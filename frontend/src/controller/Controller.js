import AppState from './State';
import Formatters from './../model/Formatters';
import RestApp from './Rest';

var Controller = (function () {
    var dummy = true,

        LoadAccountBudgets = async function () {
            AppState.SetLoadingAccountBudgets(true);
            var accountBudgets = await RestApp.GetAccountBudgets(),
                budgets = [];

            for (var i = 0; i < accountBudgets.length; i++) {
                let b = accountBudgets[i];
                let data = Formatters.formatAccountBudgetsData(i, b.AccountID, b.BudgetName, b.BudgetAmount,
                    b.SuggestedBudget, b.CurrentSpend, b.ForecastedSpend, b.BudgetHistory);
                budgets.push(data);
            }

            AppState.SetAccountBudgets(budgets);
            AppState.SetLoadingAccountBudgets(false);
        },

        LoadBudget = function (accountId, budgetName) {
            // TODO: just use the budget id
            var accountBudgets = AppState.AccountBudgets(),
                index = 0,
                budgetHistory = [],
                budget;

            while (index < accountBudgets.length) {
                budget = accountBudgets[index];
                if (budget.accountId === accountId && budget.name === budgetName) break;
                index++;
            }
            if (index >= accountBudgets.length) {
                alert('Error: could not find budget.'); // TODO: throw an exception
                return;
            }

            for (var i = 0; i < budget.budgetHistory.length; i++) {
                var id = budget.budgetHistory.length - i,
                    bh = budget.budgetHistory[i],
                    date;

                for (var d in bh)
                    date = d;
                if (typeof date === 'undefined')
                    alert('Error: could not retrieve date from budget history item.');

                var varianceDescr = Formatters.formatVarianceDescription(budget.budgetAmount, bh[date]);
                var data = Formatters.formatBudgetHistoryData(id, date, bh[date], budget.budgetAmount, budget.budgetAmount - bh[date], varianceDescr);
                budgetHistory.push(data);
            }

            // Push month-to-date (MTD) data
            var variance = budget.budgetAmount - budget.currentSpend;
            var descr = Formatters.formatVarianceDescription(budget.budgetAmount, budget.currentSpend);
            budgetHistory.push(Formatters.formatBudgetHistoryData(0, 'Oct 2019 (MTD)', budget.currentSpend, budget.budgetAmount, variance, descr)); // TODO: intelligently determine current month string
            budgetHistory.reverse();

            AppState.SetAccountID(accountId);
            AppState.SetBudgetName(budgetName);
            AppState.SetBudgetAmount(budget.budgetAmount);
            AppState.SetSuggestedBudget(budget.suggestedBudget);
            AppState.SetBudgetHistory(budgetHistory);
            AppState.SetCurrentSpend(budget.currentSpend);
            AppState.SetForecastedSpend(budget.forecastedSpend);
        },

        LoadReport = function (id) {
            var reports = AppState.Reports(),
                index = 0,
                report;

            while (index < reports.length) {
                report = reports[index];
                if (report.id === id) break;
                index++;
            }
            if (index >= reports.length) {
                alert('Error: could not find report.'); // TODO: throw an exception
                return;
            }
            AppState.SetCurrentReport(report);
        },

        UpdateAccountBudgets = async function (accountBudgets) {
            var budgets = [];
            for (var i = 0; i < accountBudgets.length; i++) {
                var b = accountBudgets[i];
                var data = Formatters.formatAccountBudgetsUploadData(b.accountId, b.name, b.budgetAmount, b.currentSpend, b.forecastedSpend);
                budgets.push(data);
            }

            await RestApp.UpdateAccountBudgets(budgets);
            await LoadAccountBudgets();
        },

        init = function () {
            AppState.init(dummy);
            LoadAccountBudgets();
        };

    return {
        init: init,
        LoadBudget: LoadBudget,
        LoadReport: LoadReport,
        UpdateAccountBudgets: UpdateAccountBudgets
    };
}());

export default Controller;