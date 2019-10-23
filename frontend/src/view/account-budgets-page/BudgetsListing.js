/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';
import BudgetAmount from './BudgetAmount';
import BudgetName from './BudgetName';
import SpendSwitch from './SpendSwitch';

function getSpendProgressColor(budget, showForecasted) {
  // Color picker for the budget spend indicator paper.
  // Calculates the spend percent and picks a color from red to
  // green based on that percent.
  let spend = (showForecasted) ? budget.ForecastedSpend : budget.CurrentSpend,
    budgetAmount = budget.BudgetAmount,
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

export default function BudgetsListing(props) {
  const [state, setState] = React.useState({
    checked: false,
  })

  const classes = useStyles();
  let spendText = (state.checked) ? "Forecasted Spend ($)" : "Current Spend ($)";
  let getSpend = function (budget) {
    if (state.checked) {
      return budget.ForecastedSpend;
    }

    return budget.CurrentSpend;
  }

  return (
    <Paper className={classes.paper}>
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Budget Name</TableCell>
              <TableCell>Budget Amount ($)</TableCell>
              <TableCell>{spendText}</TableCell>
              <TableCell>
                <SpendSwitch state={state} setState={setState} />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AppState.AccountBudgets().map(budget => (
              <TableRow key={budget.UUID}>
                <TableCell>{budget.AccountID}</TableCell>
                <TableCell>
                  <BudgetName budget={budget} />
                </TableCell>
                <TableCell>
                  <BudgetAmount
                    budget={budget}
                    budgetsEditable={props.budgetsEditable}
                    addEditedBudget={props.addEditedBudget}
                  />
                </TableCell>
                <TableCell>{NumToCurrencyString(getSpend(budget))}</TableCell>
                <TableCell>
                  <Paper style={getSpendProgressColor(budget, state.checked)}>@</Paper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Paper>
  );
}
