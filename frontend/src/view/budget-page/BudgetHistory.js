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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function BudgetHistory() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Budgeted</TableCell>
              <TableCell>Budget variance ($)</TableCell>
              <TableCell>Budget variance (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AppState.CurrentBudget().budgetHistory.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{NumToCurrencyString(row.actual)}</TableCell>
                <TableCell>{NumToCurrencyString(row.budgeted)}</TableCell>
                <TableCell>{NumToCurrencyString(row.variance)}</TableCell>
                <TableCell>{row.varianceDescr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Paper>
  );
}
