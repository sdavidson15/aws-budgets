import React from 'react';

import Grid from '@material-ui/core/Grid';

import SpendHistory from './SpendHistory';
import Chart from './Chart';
import CurrentSpend from './CurrentSpend';
import ForecastedSpend from './ForecastedSpend';
import MenuWrapper from './../menu/MenuWrapper';

import AppState from './../../controller/State';

export default function BudgetPage() {
  return (
    <MenuWrapper title={AppState.CurrentBudget().BudgetName} inner={
      <Grid container spacing={3}>
        {/* Current Spend */}
        <Grid item xs={6}>
          <CurrentSpend />
        </Grid>
        {/* Forecasted Spend */}
        <Grid item xs={6}>
          <ForecastedSpend />
        </Grid>
        {/* Chart */}
        <Grid item xs={12}>
          <Chart />
        </Grid>
        {/* Spend History */}
        <Grid item xs={12}>
          <SpendHistory />
        </Grid>
      </Grid>
    } />
  );
}
