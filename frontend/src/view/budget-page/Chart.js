/* eslint-disable no-script-url */

import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FormatChartData } from './../../model/Formatters';
import AppState from './../../controller/State';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  chartFixedHeight: {
    height: 400,
  },
}));

export default function Chart() {
  const classes = useStyles();
  const fixedHeightChart = clsx(classes.paper, classes.chartFixedHeight);
  return (
    <Paper className={fixedHeightChart}>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Budget History
        </Typography>
        <ResponsiveContainer>
          <LineChart
            data={FormatChartData(AppState.CurrentBudget().budgetHistory)}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis>
              <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                Spend ($)
                </Label>
            </YAxis>
            <Line type="monotone" dataKey="actual" stroke="#556CD6" dot={true} />
            <Line type="monotone" dataKey="budgeted" stroke="#CF2727" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    </Paper>
  );
}
