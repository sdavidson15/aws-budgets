/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import AppState from './../../controller/State'

function createData(id, date, actual, budgeted, variance, varianceDescr) {
  return { id, date, actual, budgeted, variance, varianceDescr };
}

// TODO: hit an endpoint to collect the rows.
const rows = [
  createData(0, 'Oct 2019 (MTD)', 0, 1000, 1000, '100% under budget'),
  createData(1, 'Sep 2019', 776.88, 1000, 223.12, '22.31% under budget'),
  createData(2, 'Aug 2019', 554.94, 1000, 445.06, '44.50% under budget'),
  createData(3, 'Jul 2019', 446.48, 1000, 553.52, '55.35% under budget'),
  createData(4, 'Jun 2019', 399.78, 1000, 600.22, '60.02% under budget'),
  createData(5, 'May 2019', 385.70, 1000, 614.30, '61.43% under budget'),
  createData(6, 'Apr 2019', 412.81, 1000, 587.19, '58.71% under budget'),
  createData(7, 'Mar 2019', 191.53, 1000, 808.47, '80.84% under budget'),
  createData(8, 'Feb 2019', 170.19, 1000, 829.81, '82.98% under budget'),
  createData(9, 'Jan 2019', 357.57, 1000, 642.43, '64.24% under budget'),
  createData(10, 'Dec 2018', 1275.56, 1000, -275.56, '27.55% over budget'),
  createData(11, 'Nov 2018', 1115.29, 1000, -115.29, '11.52% over budget'),
  createData(12, 'Oct 2018', 1341.69, 1000, -341.69, '34.16% over budget')
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
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
          {rows.map(row => (
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
