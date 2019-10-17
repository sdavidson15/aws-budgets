import { FormatAccountBudgetsData, FormatAccountBudgetsUploadData, FormatBudgetHistoryData, FormatVarianceDescription } from './../model/Formatters';
import AppState from './State';
import RestApp from './Rest';

var Controller = (function () {
    var dummy = true,

        LoadAccountBudgets = async function () {
            AppState.SetLoadingAccountBudgets(true);
            var accountBudgets = await RestApp.GetAccountBudgets(),
                budgets = [];

            for (var i = 0; i < accountBudgets.length; i++) {
                let b = accountBudgets[i];
                let data = FormatAccountBudgetsData(i, b.AccountID, b.BudgetName, b.BudgetAmount,
                    b.SuggestedBudget, b.CurrentSpend, b.ForecastedSpend, b.BudgetHistory);
                budgets.push(data);
            }

            AppState.SetAccountBudgets(budgets);
            AppState.SetOptimisticBudgets([]);
            AppState.SetLoadingAccountBudgets(false);
        },

        LoadBudget = function (budgetId) {
            var accountBudgets = AppState.AccountBudgets(),
                index = 0,
                budgetHistory = [],
                budget;

            while (index < accountBudgets.length) {
                budget = accountBudgets[index];
                if (budget.id === budgetId) break;
                index++;
            }
            if (index >= accountBudgets.length) {
                alert('Error: could not find budget. Continue to reload.');
                window.location.reload();
            }

            for (var i = 0; i < budget.budgetHistory.length; i++) {
                var id = budget.budgetHistory.length - i,
                    bh = budget.budgetHistory[i],
                    date;

                for (var d in bh)
                    date = d;
                if (typeof date === 'undefined')
                    alert('Error: could not retrieve date from budget history item.');

                var varianceDescr = FormatVarianceDescription(budget.budgetAmount, bh[date]);
                var data = FormatBudgetHistoryData(id, date, bh[date], budget.budgetAmount, budget.budgetAmount - bh[date], varianceDescr);
                budgetHistory.push(data);
            }

            // Push month-to-date (MTD) data
            var variance = budget.budgetAmount - budget.currentSpend;
            var descr = FormatVarianceDescription(budget.budgetAmount, budget.currentSpend);
            budgetHistory.push(FormatBudgetHistoryData(0, 'Oct 2019 (MTD)', budget.currentSpend, budget.budgetAmount, variance, descr)); // TODO: intelligently determine current month string
            budgetHistory.reverse();

            budget.budgetHistory = budgetHistory;

            AppState.SetCurrentBudget(budget);
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
            AppState.SetOptimisticBudgets(accountBudgets);

            var budgets = [];
            for (var i = 0; i < accountBudgets.length; i++) {
                var b = accountBudgets[i];
                var data = FormatAccountBudgetsUploadData(b.accountId, b.name, b.budgetAmount, b.currentSpend, b.forecastedSpend);
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