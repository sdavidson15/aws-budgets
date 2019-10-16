import React from 'react';

import Grid from '@material-ui/core/Grid';

import MenuWrapper from './../menu/MenuWrapper';
import ReportsListing from './ReportsListing';

export default class ReportsPage extends React.Component {
  constructor() {
    super(props);
  }

  render() {
    return (
      <MenuWrapper title='Reports' inner={
        <Grid container spacing={3}>
          {/* Reports Listing */}
          <Grid item xs={12}>
            <ReportsListing />
          </Grid>
        </Grid>
      } />
    );
  }
}
