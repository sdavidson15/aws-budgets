/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { FormatDate, FormatVarianceDescription, NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function SpendHistory() {
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
            {AppState.CurrentBudget().SpendHistory.map(item => (
              <TableRow key={item.Date}>
                <TableCell>{FormatDate(item.Date)}</TableCell>
                <TableCell>{NumToCurrencyString(item.Spend)}</TableCell>
                <TableCell>{NumToCurrencyString(item.BudgetAmount)}</TableCell>
                <TableCell>{NumToCurrencyString(item.BudgetAmount - item.Spend)}</TableCell>
                <TableCell>{FormatVarianceDescription(item.BudgetAmount, item.Spend)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Paper>
  );
}
