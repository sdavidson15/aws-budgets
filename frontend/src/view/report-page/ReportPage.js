import React from 'react';

import Grid from '@material-ui/core/Grid';

import AppState from './../../controller/State';
import MenuWrapper from './../menu/MenuWrapper';
import ReportBody from './ReportBody';
import Summary from './Summary';

export default function ReportPage() {
  return (
    <MenuWrapper title={AppState.CurrentReport().name} inner={
      <Grid container spacing={3}>
        {/* Report Body */}
        <Grid item xs={12}>
          <ReportBody />
        </Grid>
        {/* Summary */}
        <Grid item xs={12}>
          <Summary />
        </Grid>
      </Grid>
    } />
  );
}
