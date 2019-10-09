import React from 'react'
import ReactDOM from "react-dom"

import { ThemeProvider } from "@material-ui/styles"; // TODO: actually provide a theme
import CssBaseline from "@material-ui/core/CssBaseline";

import AccountBudgets from "./account-budgets-page/AccountBudgets";
import AppState from './../controller/State';
import Budget from "./budget-page/Budget";
import Dashboard from "./dashboard-page/Dashboard";

const DashboardPage = 'Dashboard';
const AccountBudgetsPage = 'AccountBudgets';
const BudgetPage = 'Budget';

var View = (function () {
    var currentPage,
        drawerOpen=true,

        GetDrawerOpen = function () {
            return drawerOpen;
        },

        SetDrawerOpen = function (open) {
            drawerOpen = open;
        },

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
        DrawerOpen: GetDrawerOpen,
        SetDrawerOpen: SetDrawerOpen,
        RenderDashboardPage: RenderDashboardPage,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderBudgetPage: RenderBudgetPage,
    };
}());

export default View;