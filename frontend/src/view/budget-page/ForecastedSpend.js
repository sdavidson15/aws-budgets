/* eslint-disable no-script-url */

import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FormatSpend, NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = makeStyles(theme => ({
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
}));

export default function ForecastedSpend() {
  const classes = useStyles();
  let fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Forecasted vs. Budgeted
          </Typography>
        <Typography component="p" variant="h6">
          {FormatSpend(AppState.CurrentBudget().forecastedSpend, AppState.CurrentBudget().budgetAmount)}
        </Typography>
        <Typography color="textSecondary" className={classes.title}>
          Forecasted
          </Typography>
        <Typography component="p" variant="h6">
          {NumToCurrencyString(AppState.CurrentBudget().budgetAmount)}
        </Typography>
        <Typography color="textSecondary" className={classes.title}>
          Budgeted amount
          </Typography>
      </React.Fragment>
    </Paper>
  );
}
