/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { FormatVarianceDescription, NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = makeStyles({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

export default class ReportBody extends React.Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
  }

  render() {
    return (
      <Paper className={this.classes.paper}>
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell>Account Label</TableCell>
                <TableCell>Budget Amount ($)</TableCell>
                <TableCell>Alert Count</TableCell>
                <TableCell>Final Cost ($)</TableCell>
                <TableCell>Over ($)</TableCell>
                <TableCell>Over (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AppState.CurrentReport().reportBody.map(row => (
                <TableRow key={row.accountID}>
                  <TableCell>{row.accountID}</TableCell>
                  <TableCell>{row.accountLabel}</TableCell>
                  <TableCell>{NumToCurrencyString(row.budgeted)}</TableCell>
                  <TableCell>{row.alertCount}</TableCell>
                  <TableCell>{NumToCurrencyString(row.spend)}</TableCell>
                  <TableCell>{NumToCurrencyString(row.spend - row.budgeted)}</TableCell>
                  <TableCell>{FormatVarianceDescription(row.budgeted, row.spend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    );
  }
}
