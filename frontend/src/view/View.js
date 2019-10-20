import React from 'react'
import ReactDOM from "react-dom"

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AccountBudgetsPage from "./account-budgets-page/AccountBudgetsPage";
import AppState from './../controller/State';
import BudgetPage from './budget-page/BudgetPage';
import EditBudgetPage from './edit-budget-page/EditBudgetPage';
import ReportPage from './report-page/ReportPage';
import ReportsPage from './reports-page/ReportsPage';

const AccountBudgetsPageConst = 'AccountBudgets';
const BudgetPageConst = 'Budget';
const EditBudgetPageConst = 'EditBudget';
const ReportPageConst = 'Report';
const ReportsPageConst = 'Reports';

var View = (function () {
    var currentPageConst,
        menuDrawerOpen = true,

        CurrentPageIsEditable = function () {
            return (currentPageConst === AccountBudgetsPageConst ||
                currentPageConst === BudgetPageConst ||
                currentPageConst === ReportsPageConst);
        },

        GetMenuDrawerOpen = function () {
            return menuDrawerOpen;
        },

        RenderAccountBudgetsPage = async function (budgetsEditable = false) {
            renderPage(<AccountBudgetsPage budgetsEditable={budgetsEditable} />, AccountBudgetsPageConst);
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            while (AppState.LoadingAccountBudgets())
                await sleep(500);

            renderPage(<AccountBudgetsPage budgetsEditable={budgetsEditable} />, AccountBudgetsPageConst);
        },

        RenderBudgetPage = function () {
            if (currentPageConst === BudgetPageConst) return;
            renderPage(<BudgetPage />, BudgetPageConst);
        },

        RenderEditablePage = function () {
            if (currentPageConst === BudgetPageConst) RenderEditBudgetPage();
            if (currentPageConst === AccountBudgetsPageConst) RenderAccountBudgetsPage(true);
        },

        RenderEditBudgetPage = function () {
            if (currentPageConst === EditBudgetPageConst) return;
            renderPage(<EditBudgetPage />, EditBudgetPageConst);
        },

        RenderReportPage = function () {
            if (currentPageConst === ReportPageConst) return;
            renderPage(<ReportPage />, ReportPageConst);
        },

        RenderReportsPage = function () {
            if (currentPageConst === ReportsPageConst) return;
            renderPage(<ReportsPage />, ReportsPageConst);
        },

        SetMenuDrawerOpen = function (open) {
            menuDrawerOpen = open;
        },

        renderPage = function (page, pageConst) {
            currentPageConst = pageConst;
            ReactDOM.render(
                <ThemeProvider>
                    <CssBaseline />
                    {page}
                </ThemeProvider>,
                document.querySelector('#root')
            );
        },

        init = function () {
            RenderAccountBudgetsPage();
        };

    return {
        init: init,
        CurrentPageIsEditable: CurrentPageIsEditable,
        MenuDrawerOpen: GetMenuDrawerOpen,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderEditablePage: RenderEditablePage,
        RenderBudgetPage: RenderBudgetPage,
        RenderReportPage: RenderReportPage,
        RenderReportsPage: RenderReportsPage,
        SetMenuDrawerOpen: SetMenuDrawerOpen,
    };
}());

export default View;