import React from 'react'
import ReactDOM from "react-dom"

import { ThemeProvider } from "@material-ui/styles"; // TODO: actually provide a theme
import CssBaseline from "@material-ui/core/CssBaseline";

import AccountBudgets from "./account-budgets-page/AccountBudgets";
import AppState from './../controller/State';
import Budget from './budget-page/Budget';
import EditBudget from './edit-budget-page/EditBudget';
import Reports from './reports-page/Reports';

const AccountBudgetsPage = 'AccountBudgets';
const BudgetPage = 'Budget';
const EditBudgetPage = 'EditBudget';
const ReportsPage = 'Reports';

var View = (function () {
    var currentPage,
        drawerOpen = true,

        CurrentPageIsEditable = function () {
            return (currentPage === BudgetPage || currentPage === ReportsPage);
        },

        GetDrawerOpen = function () {
            return drawerOpen;
        },

        HandleEditClick = function () {
            if (currentPage === BudgetPage) RenderEditBudgetPage();
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

        RenderEditBudgetPage = function () {
            if (currentPage === EditBudgetPage) return;
            renderPage(<EditBudget />, EditBudgetPage);
        },

        RenderReportsPage = function () {
            if (currentPage === ReportsPage) return;
            renderPage(<Reports />, ReportsPage);
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

        SetDrawerOpen = function (open) {
            drawerOpen = open;
        },

        init = function () {
            RenderAccountBudgetsPage();
        };

    return {
        init: init,
        CurrentPageIsEditable: CurrentPageIsEditable,
        DrawerOpen: GetDrawerOpen,
        HandleEditClick: HandleEditClick,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderBudgetPage: RenderBudgetPage,
        RenderReportsPage: RenderReportsPage,
        SetDrawerOpen: SetDrawerOpen,
    };
}());

export default View;