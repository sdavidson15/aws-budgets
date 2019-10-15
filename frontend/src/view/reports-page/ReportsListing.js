/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppState from './../../controller/State';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Controller from './../../controller/Controller';
import View from './../View';

function onReportNameClick(id) {
    Controller.LoadReport(id);
    View.RenderReportPage();
}

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
}));

export default function ReportsListing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AppState.Reports().map(report => (
            <TableRow key={report.id}>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Button className={classes.button} onClick={() => onReportNameClick(report.id)}>
                  {report.name}
                </Button>
              </TableCell>
              <TableCell>{report.reportType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}