/* eslint-disable no-script-url */

import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AppState from './../../controller/State';
import Formatters from './../../model/Formatters';

export default function ReportBody() {
  return (
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
          {AppState.ReportBody().map(row => (
            <TableRow key={row.accountID}>
              <TableCell>{row.accountID}</TableCell>
              <TableCell>{row.accountLabel}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.budgeted)}</TableCell>
              <TableCell>{row.alertCount}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.spend)}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.spend-row.budgeted)}</TableCell>
              <TableCell>{Formatters.formatVarianceDescription(row.budgeted, row.spend)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
