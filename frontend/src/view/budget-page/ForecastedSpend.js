/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AppState from './../../controller/State';
import Formatters from './../../model/Formatters';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ForecastedSpend() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Forecasted vs. budgeted</Title>
      <Typography component="p" variant="h6">
        {Formatters.formatSpend(AppState.ForecastedSpend(), AppState.BudgetAmount())}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Forecasted
      </Typography>
      <Typography component="p" variant="h6">
        {Formatters.numToCurrencyString(AppState.BudgetAmount())}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Budgeted amount
      </Typography>
    </React.Fragment>
  );
}
