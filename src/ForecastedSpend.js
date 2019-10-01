/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

// TODO: hit an endpoint to collect the spend
var forecastedSpend= '$788.99\t(78.90% of budgeted)'
var budget = '$1,000'

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Forecasted vs. budgeted</Title>
      <Typography component="p" variant="h6">
        {forecastedSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Forecasted
      </Typography>
      <Typography component="p" variant="h6">
        {budget}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Budgeted amount
      </Typography>
    </React.Fragment>
  );
}
