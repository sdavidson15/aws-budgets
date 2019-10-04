/* eslint-disable no-script-url */

import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import View from './../View';
import Formatters from './../../model/Formatters';

function onBudgetNameClick(accountId, name) {
  Controller.LoadBudget(accountId, name);
  View.RenderBudgetPage();
}

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function BudgetHistory() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>Budget Name</TableCell>
            <TableCell>Budget Amount ($)</TableCell>
            <TableCell>Current Spend ($)</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AppState.AccountBudgets().map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.accountId}</TableCell>
              <TableCell>
                <Button className={classes.button} onClick={() => onBudgetNameClick(row.accountId, row.name)}>
                  {row.name}
                </Button>
              </TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.budgetAmount)}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.currentSpend)}</TableCell>
              <TableCell>cool progress meter</TableCell>
              <TableCell>
                <Button className={classes.button} onClick={onBudgetNameClick}>
                  See alert list
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="https://en.wikipedia.org/wiki/Special:Random">
          Load more budgets
        </Link>
      </div>
    </React.Fragment>
  );
}
