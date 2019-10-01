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

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Month to Date</Title>
      <Typography component="p" variant="h6">
        {forecastedSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Forecasted
      </Typography>
    </React.Fragment>
  );
}
