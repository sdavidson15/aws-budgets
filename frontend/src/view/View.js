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

const AccountBudgetsPage = 'AccountBudgets';
const BudgetPage = 'Budget';
const EditBudgetPage = 'EditBudget';
const ReportPage = 'Report';
const ReportsPage = 'Reports';

var View = (function () {
    var currentPage,
        menuDrawerOpen = true,

        CurrentPageIsEditable = function () {
            return (currentPage === AccountBudgetsPage ||
                    currentPage === BudgetPage ||
                    currentPage === ReportsPage);
        },

        GetMenuDrawerOpen = function () {
            return menuDrawerOpen;
        }

        RenderAccountBudgetsPage = async function (editable=false) {
            renderPage(<AccountBudgetsPage editable={editable} />, AccountBudgetsPage);
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            while (AppState.LoadingAccountBudgets())
                await sleep(500);

            renderPage(<AccountBudgetsPage editable={editable} />, AccountBudgetsPage);
        },

        RenderBudgetPage = function () {
            if (currentPage === BudgetPage) return;
            renderPage(<BudgetPage />, BudgetPage);
        },

        RenderEditablePage = function () {
            if (currentPage === BudgetPage) RenderEditBudgetPage();
            if (currentPage === AccountBudgetsPage) RenderAccountBudgetsPage(true);
        },

        RenderEditBudgetPage = function () {
            if (currentPage === EditBudgetPage) return;
            renderPage(<EditBudgetPage />, EditBudgetPage);
        },

        RenderReportPage = function () {
            if (currentPage === ReportPage) return;
            renderPage(<ReportPage />, ReportPage);
        },

        RenderReportsPage = function () {
            if (currentPage === ReportsPage) return;
            renderPage(<ReportsPage />, ReportsPage);
        },

        SetMenuDrawerOpen = function (open) {
            menuDrawerOpen = open;
        },

        renderPage = function (page, pageConst) {
            currentPage = pageConst;
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