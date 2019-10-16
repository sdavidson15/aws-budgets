/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { NumToCurrencyString } from './../../model/Formatters';
import BudgetAmount from './BudgetAmount';
import BudgetName from './BudgetName';
import SpendSwitch from './SpendSwitch';
import View from './../View';

// TODO: move this to the style file
function getSpendProgressColor(budget) {
  // Color picker for the budget spend indicator paper.
  // Calculates the spend percent and picks a color from red to
  // green based on that percent.
  let spend = (View.SpendSwitchState()) ? budget.forecastedSpend : budget.currentSpend,
    budgetAmount = budget.budgetAmount,
    spendColor = 'red';

  if (spend < budgetAmount) {
    let percent = spend / budgetAmount,
      greenNum = (spend < budgetAmount / 2) ? 255 : (1 - percent) * 255 * 2,
      redNum = (spend > budgetAmount / 2) ? 255 : percent * 255 * 2,
      g = greenNum.toFixed(0).toString(),
      r = redNum.toFixed(0).toString();

    spendColor = ('rgb(').concat(r, ', ', g, ', 0)');
  }

  return {
    background: spendColor,
    color: spendColor,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default class BudgetsListing extends React.Component {
  constructor() {
    super(props);
    this.classes = useStyles();
  }

  handleBudgetNameClick(accountId, name) {
    Controller.LoadBudget(accountId, name);
    View.RenderBudgetPage();
  }

  render() {
    let spendText = (View.SpendSwitchState()) ? "Forecasted Spend ($)" : "Current Spend ($)";
    let getSpend = function (budget) {
      if (this.switchState.checked) {
        return budget.forecastedSpend;
      }

      return budget.currentSpend;
    }

    return (
      <Paper className={this.classes.paper}>
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell>Budget Name</TableCell>
                <TableCell>Budget Amount ($)</TableCell>
                <TableCell>{spendText}</TableCell>
                <TableCell><SpendSwitch /></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AppState.AccountBudgets().map(budget => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.accountId}</TableCell>
                  <TableCell><BudgetName budget={budget} /></TableCell>
                  <TableCell><BudgetAmount budget={budget} /></TableCell>
                  <TableCell>{NumToCurrencyString(getSpend(budget))}</TableCell>
                  <TableCell><Paper style={getSpendProgressColor(budget)}>@</Paper></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    );
  }
}
