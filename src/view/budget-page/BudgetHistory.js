/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppState from './../../controller/State'

const useStyles = makeStyles(theme => ({
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
              <TableCell>{row.actual}</TableCell>
              <TableCell>{row.budgeted}</TableCell>
              <TableCell>{row.variance}</TableCell>
              <TableCell>{row.varianceDescr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="https://en.wikipedia.org/wiki/Special:Random">
          Expand budget history
        </Link>
      </div>
    </React.Fragment>
  );
}
