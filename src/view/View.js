import React from 'react'
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles"; // TODO: actually provide a theme
import Dashboard from "./dashboard-page/Dashboard";
import Budget from "./budget-page/Budget";
import AccountBudgets from "./account-budgets-page/AccountBudgets";
import AppState from './../controller/State';

const DashboardPage = 'Dashboard';
const AccountBudgetsPage = 'AccountBudgets';
const BudgetPage = 'Budget';

var View = (function () {
    var currentPage,

        RenderDashboardPage = function () {
            if (currentPage === DashboardPage) return;
            renderPage(<Dashboard />, DashboardPage);
        },

        RenderAccountBudgetsPage = async function () {
            if (currentPage === AccountBudgetsPage) return;
            renderPage(<AccountBudgets />, AccountBudgetsPage);

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            while (AppState.LoadingAccountBudgets())
                await sleep(500);

            renderPage(<AccountBudgets />, AccountBudgetsPage);
        },

        RenderBudgetPage = function () {
            if (currentPage === BudgetPage) return;
            renderPage(<Budget />, BudgetPage);
        },

        renderPage = function (_page, _page_const) {
            ReactDOM.render(
                <ThemeProvider>
                    <CssBaseline />
                    {_page}
                </ThemeProvider>,
                document.querySelector('#root')
            );
            currentPage = _page_const;
        },

        init = function () {
            RenderDashboardPage();
        };

    return {
        init: init,
        RenderDashboardPage: RenderDashboardPage,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderBudgetPage: RenderBudgetPage
    };
}());

export default View;