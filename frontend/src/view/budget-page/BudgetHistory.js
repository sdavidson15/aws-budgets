/* eslint-disable no-script-url */

import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AppState from './../../controller/State';
import Formatters from './../../model/Formatters';

export default function BudgetHistory() {
  return (
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
          {AppState.BudgetHistory().map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.actual)}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.budgeted)}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.variance)}</TableCell>
              <TableCell>{row.varianceDescr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
