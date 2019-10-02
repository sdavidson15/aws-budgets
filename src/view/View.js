import React from 'react'
import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Dashboard from "./dashboard-page/Dashboard";
import Budget from "./budget-page/Budget";

const DashboardPage = 'Dashboard';
const BudgetPage = 'Budget';

var View = (function() {
    var currentPage,

    RenderDashboardPage = function () {
        if (currentPage == DashboardPage) return;
        renderPage(<Dashboard />);
        currentPage = DashboardPage;
    },

    RenderBudgetPage = function () {
        if (currentPage == BudgetPage) return;
        renderPage(<Budget />);
        currentPage = BudgetPage;
    },

    renderPage = function (_page) {
        ReactDOM.render(
            <ThemeProvider>
               <CssBaseline />
               {_page}
            </ThemeProvider>,
            document.querySelector('#root') 
         );
    },

    init = function () {
        RenderDashboardPage();
    };

    return {
        init: init,
        RenderDashboardPage: RenderDashboardPage,
        RenderBudgetPage: RenderBudgetPage
    };
}());

export default View;