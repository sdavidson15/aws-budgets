import React from 'react';

import Grid from '@material-ui/core/Grid';

import AppState from './../../controller/State';
import Chart from './../budget-page/Chart';
import EditFields from './EditFields';
import FooterButtons from './FooterButtons';
import MenuWrapper from './../menu/MenuWrapper';

export default function EditBudgetPage() {
  let editedBudgetAmount = AppState.CurrentBudget().BudgetAmount;

  function getEditedBudgetAmount() {
    return editedBudgetAmount;
  }

  function setEditedBudgetAmount(amount) {
    editedBudgetAmount = amount;
  }

  return (
    <MenuWrapper title='Edit Budget' inner={
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Chart />
        </Grid>
        {/* Edit Fields */}
        <Grid item xs={12}>
          <EditFields setEditedBudgetAmount={setEditedBudgetAmount} />
        </Grid>
        {/* Footer Buttons */}
        <Grid item xs={12}>
          <FooterButtons getEditedBudgetAmount={getEditedBudgetAmount} />
        </Grid>
      </Grid>
    } />
  );
}
