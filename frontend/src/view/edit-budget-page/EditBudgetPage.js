import React from 'react';

import Grid from '@material-ui/core/Grid';

import AppState from './../../controller/State';
import Chart from './../budget-page/Chart';
import EditFields from './EditFields';
import FooterButtons from './FooterButtons';
import MenuWrapper from './../menu/MenuWrapper';

export default class EditBudgetPage extends React.Component {
  constructor(props) {
    super(props);
    this.editedBudgetAmount = AppState.Budget().budgetAmount;
  }

  getEditedBudgetAmount() {
    return this.editedBudgetAmount;
  }

  setEditedBudgetAmount(amount) {
    this.editedBudgetAmount = amount;
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
            <EditFields setEditedBudgetAmount={this.setEditedBudgetAmount} />
          </Grid>
          {/* Footer Buttons */}
          <Grid item xs={12}>
            <FooterButtons getEditedBudgetAmount={this.getEditedBudgetAmount} />
          </Grid>
        </Grid>
      } />
    );
  }
}
