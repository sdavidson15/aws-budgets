/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default class ReportsListing extends React.Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
  }

  handleReportNameClick(reportId) {
    Controller.LoadReport(reportId);
    View.RenderReportPage();
  }

  render() {
    return (
      <Paper className={this.classes.paper}>
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
                    <Button className={this.classes.button} onClick={() => this.handleReportNameClick(report.id)}>
                      {report.name}
                    </Button>
                  </TableCell>
                  <TableCell>{report.reportType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    );
  }
}
