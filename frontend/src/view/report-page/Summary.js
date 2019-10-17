/* eslint-disable no-script-url */

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

class Summary extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell># of accounts over budget</TableCell>
                <TableCell>% of accounts over budget</TableCell>
                <TableCell>Total amount over budget</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {/* TODO: get rid of dummy data */}
                <TableCell>36</TableCell>
                <TableCell>28.8%</TableCell>
                <TableCell>$159288.37</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Summary);
