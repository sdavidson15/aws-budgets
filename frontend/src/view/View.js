import React from 'react'
import ReactDOM from "react-dom"

import { ThemeProvider } from "@material-ui/styles"; // TODO: actually provide a theme
import CssBaseline from "@material-ui/core/CssBaseline";

import AccountBudgets from "./account-budgets-page/AccountBudgets";
import AppState from './../controller/State';
import Budget from './budget-page/Budget';
import EditBudget from './edit-budget-page/EditBudget';
import Report from './report-page/Report';
import Reports from './reports-page/Reports';

const AccountBudgetsPage = 'AccountBudgets';
const BudgetPage = 'Budget';
const EditBudgetPage = 'EditBudget';
const ReportPage = 'Report';
const ReportsPage = 'Reports';

var View = (function () {
    var currentPage,
        drawerOpen = true,
        editAccountBudgets = false,
        editFieldBudgetAmount,
        editedBudgets = {},

        AddBudgetEdit = function (budget) {
            editedBudgets[budget.id] = budget;
        },

        CurrentPageIsEditable = function () {
            return (currentPage === AccountBudgetsPage ||
                    currentPage === BudgetPage ||
                    currentPage === ReportsPage);
        },

        GetDrawerOpen = function () {
            return drawerOpen;
        }

        GetEditAccountBudgets = function () {
            return editAccountBudgets;
        },

        GetEditFieldBudgetAmount = function () {
            return editFieldBudgetAmount;
        },

        GetEditedBudgets = function () {
            if (typeof editedBudgets === 'undefined') return {};
            return editedBudgets;
        },

        HandleEditClick = function () {
            if (currentPage === BudgetPage) RenderEditBudgetPage();
            if (currentPage === AccountBudgetsPage) {
                editAccountBudgets = true;
                RenderAccountBudgetsPage();
            }
        },

        RenderAccountBudgetsPage = async function () {
            renderPage(<AccountBudgets isDrawerOpen={isDrawerOpen} />, AccountBudgetsPage);
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            while (AppState.LoadingAccountBudgets())
                await sleep(500);

            renderPage(<AccountBudgets />, AccountBudgetsPage);
        },

        RenderBudgetPage = function () {
            if (currentPage === BudgetPage) return;
            renderPage(<Budget isDrawerOpen={isDrawerOpen} />, BudgetPage);
        },

        RenderEditBudgetPage = function () {
            if (currentPage === EditBudgetPage) return;
            editFieldBudgetAmount = AppState.BudgetAmount();
            renderPage(<EditBudget isDrawerOpen={isDrawerOpen} />, EditBudgetPage);
        },

        RenderReportPage = function () {
            if (currentPage === ReportPage) return;
            renderPage(<Report isDrawerOpen={isDrawerOpen} />, ReportPage);
        },

        RenderReportsPage = function () {
            if (currentPage === ReportsPage) return;
            renderPage(<Reports isDrawerOpen={isDrawerOpen} />, ReportsPage);
        },

        renderPage = function (page, pageConst) {
            if (pageConst !== AccountBudgetsPage) {
                editAccountBudgets = false;
            }
            edittedBudgets = {};

            ReactDOM.render(
                <ThemeProvider>
                    <CssBaseline />
                    {page}
                </ThemeProvider>,
                document.querySelector('#root')
            );
            currentPage = pageConst;
        },

        SetDrawerOpen = function (open) {
            drawerOpen = open;
        },

        SetEditAccountBudgets = function (bool) {
            editAccountBudgets = bool;
        },

        SetEditFieldBudgetAmount = function (amount) {
            editFieldBudgetAmount = amount;
        },

        init = function () {
            RenderAccountBudgetsPage();
        };

    return {
        init: init,
        AddBudgetEdit: AddBudgetEdit,
        CurrentPageIsEditable: CurrentPageIsEditable,
        DrawerOpen: GetDrawerOpen,
        EditAccountBudgets: GetEditAccountBudgets,
        EditFieldBudgetAmount: GetEditFieldBudgetAmount,
        EditedBudgets: GetEditedBudgets,
        HandleEditClick: HandleEditClick,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderBudgetPage: RenderBudgetPage,
        RenderReportPage: RenderReportPage,
        RenderReportsPage: RenderReportsPage,
        SetDrawerOpen: SetDrawerOpen,
        SetEditAccountBudgets: SetEditAccountBudgets,
        SetEditFieldBudgetAmount: SetEditFieldBudgetAmount,
    };
}());

export default View;