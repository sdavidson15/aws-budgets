import { NewBudget, NewNotification, NewSpendHistoryItem } from '../model/Model';
import AppState from './State';
import RestApp from './Rest';

var Controller = (function () {
    var dummy = true,

        LoadAccountBudgets = async function () {
            AppState.SetLoadingAccountBudgets(true);
            let accountBudgets = await RestApp.GetAccountBudgets();
            let budgets = validateAccountBudgets(accountBudgets);

            AppState.SetAccountBudgets(budgets);
            AppState.SetOptimisticBudgets([]);
            AppState.SetLoadingAccountBudgets(false);
        },

        LoadBudget = function (budgetId) {
            var accountBudgets = AppState.AccountBudgets(),
                index = 0,
                budget;

            // Locate the budget with the budgetId
            while (index < accountBudgets.length) {
                budget = accountBudgets[index];
                if (budget.UUID === budgetId) break;
                index++;
            }
            if (index >= accountBudgets.length) {
                alert('Error: could not find budget. Continue to reload.');
                window.location.reload();
            }

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
            await RestApp.UpdateAccountBudgets(accountBudgets);
            await LoadAccountBudgets();
        },

        validateAccountBudgets = function (accountBudgets) {
            let validatedBudgets = [];
            for (let i = 0; i < accountBudgets.length; i++) {
                let budget = NewBudget(accountBudgets[i]);

                let notifications = [];
                for (let j = 0; j < budget.Notifications.length; j++) {
                    notifications.push(NewNotification(budget.Notifications[j]));
                }
                notifications.reverse();
                budget.Notifications = notifications;

                let spendHistory = [];
                for (let j = 0; j < budget.SpendHistory.length; j++) {
                    spendHistory.push(NewSpendHistoryItem(budget.SpendHistory[j], budget.BudgetAmount));
                }
                spendHistory.reverse();
                budget.SpendHistory = spendHistory;

                validatedBudgets.push(budget);
            }

            return validatedBudgets;
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