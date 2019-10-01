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
var currentSpend = '$767.72\t(76.77% of budgeted)'
var budget = '$1,000'

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Current vs. budgeted</Title>
      <Typography component="p" variant="h6">
        {currentSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Current
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
