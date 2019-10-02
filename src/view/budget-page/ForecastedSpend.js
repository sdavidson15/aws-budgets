/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import AppState from './../../controller/State'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Forecasted vs. budgeted</Title>
      <Typography component="p" variant="h6">
        {AppState.ForecastedSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Forecasted
      </Typography>
      <Typography component="p" variant="h6">
        {AppState.BudgetAmount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Budgeted amount
      </Typography>
    </React.Fragment>
  );
}
