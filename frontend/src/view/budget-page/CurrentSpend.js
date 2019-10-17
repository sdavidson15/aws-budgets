/* eslint-disable no-script-url */

import clsx from 'clsx';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FormatSpend, NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = theme => ({
  title: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
});

class CurrentSpend extends React.Component {
  render() {
    const { classes } = this.props;
    let fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Paper className={fixedHeightPaper}>
        <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Current vs. Budgeted
          </Typography>
          <Typography component="p" variant="h6">
            {FormatSpend(AppState.CurrentSpend(), AppState.BudgetAmount())}
          </Typography>
          <Typography color="textSecondary" className={classes.title}>
            Current
          </Typography>
          <Typography component="p" variant="h6">
            {NumToCurrencyString(AppState.BudgetAmount())}
          </Typography>
          <Typography color="textSecondary" className={classes.title}>
            Budgeted amount
          </Typography>
        </React.Fragment>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(CurrentSpend);
