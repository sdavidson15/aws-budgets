/* eslint-disable no-script-url */

import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FormatSpend, NumToCurrencyString } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = makeStyles({
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

export default class ForecastedSpend extends React.Component {
  constructor() {
    super(props);
    this.classes = useStyles();
  }

  render() {
    let fixedHeightPaper = clsx(this.classes.paper, this.classes.fixedHeight);

    return (
      <Paper className={fixedHeightPaper}>
        <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Forecasted vs. Budgeted
          </Typography>
          <Typography component="p" variant="h6">
            {FormatSpend(AppState.ForecastedSpend(), AppState.BudgetAmount())}
          </Typography>
          <Typography color="textSecondary" className={this.classes.title}>
            Forecasted
          </Typography>
          <Typography component="p" variant="h6">
            {NumToCurrencyString(AppState.BudgetAmount())}
          </Typography>
          <Typography color="textSecondary" className={this.classes.title}>
            Budgeted amount
          </Typography>
        </React.Fragment>
      </Paper>
    );
  }
}
