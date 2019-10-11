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
        editAccountBudgets = false,
        editFieldBudgetAmount,
        edittedBudgets = {},

        AddBudgetEdit = function (budget) {
            edittedBudgets[budget.id] = budget;
        },

        CurrentPageIsEditable = function () {
            return (currentPage === AccountBudgetsPage ||
                    currentPage === BudgetPage ||
                    currentPage === ReportsPage);
        },

        GetDrawerOpen = function () {
            return drawerOpen;
        },

        GetEditAccountBudgets = function () {
            return editAccountBudgets;
        },

        GetEditFieldBudgetAmount = function () {
            return editFieldBudgetAmount;
        },

        GetEdittedBudgets = function () {
            if (typeof edittedBudgets === 'undefined') return {};
            return edittedBudgets;
        },

        HandleEditClick = function () {
            if (currentPage === BudgetPage) RenderEditBudgetPage();
            if (currentPage === AccountBudgetsPage) {
                editAccountBudgets = true;
                RenderAccountBudgetsPage();
            }
        },

        RenderAccountBudgetsPage = async function () {
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
            editFieldBudgetAmount = AppState.BudgetAmount();
            renderPage(<EditBudget />, EditBudgetPage);
        },

        RenderReportsPage = function () {
            if (currentPage === ReportsPage) return;
            renderPage(<Reports />, ReportsPage);
        },

        renderPage = function (_page, _page_const) {
            if (_page_const !== AccountBudgetsPage) {
                editAccountBudgets = false;
            }
            edittedBudgets = {};

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
        EdittedBudgets: GetEdittedBudgets,
        HandleEditClick: HandleEditClick,
        RenderAccountBudgetsPage: RenderAccountBudgetsPage,
        RenderBudgetPage: RenderBudgetPage,
        RenderReportsPage: RenderReportsPage,
        SetDrawerOpen: SetDrawerOpen,
        SetEditAccountBudgets: SetEditAccountBudgets,
        SetEditFieldBudgetAmount: SetEditFieldBudgetAmount,
    };
}());

export default View;