import React from 'react';

import Grid from '@material-ui/core/Grid';

import Chart from './../budget-page/Chart';
import EditFields from './EditFields';
import FooterButtons from './FooterButtons';
import MenuWrapper from './../menu/MenuWrapper';

export default class EditBudgetPage extends React.Component {
  constructor() {
    super(props);
  }

  render() {
    return (
      <MenuWrapper title='Edit Budget' inner={
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Chart />
          </Grid>
          {/* Edit Fields */}
          <Grid item xs={12}>
            <EditFields />
          </Grid>
          {/* Footer Buttons */}
          <Grid item xs={12}>
            <FooterButtons />
          </Grid>
        </Grid>
      } />
    );
  }
}
