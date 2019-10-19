import React from 'react';

import Grid from '@material-ui/core/Grid';

import AppState from './../../controller/State';
import BudgetsListing from './BudgetsListing';
import Loading from './Loading';
import MenuWrapper from './../menu/MenuWrapper';
import Search from './Search';
import Sort from './Sort';

export default function AccountBudgetsPage(props) {
  let editedBudgets = {};
  function addEditedBudget(budget) {
    if (props.budgetsEditable)
      editedBudgets[budget.id] = budget;
  }

  let budgetsListing = <BudgetsListing budgetsEditable={props.budgetsEditable} addEditedBudget={addEditedBudget} />;
  if (AppState.LoadingAccountBudgets()) {
    budgetsListing = <Loading />;
  }

  return (
    <MenuWrapper title='Account Budgets' budgetsEditable={props.budgetsEditable} inner={
      <Grid container spacing={3}>
        {/* Search */}
        <Grid item xs={8}>
          <Search />
        </Grid>
        {/* Sort */}
        <Grid item xs={4}>
          <Sort />
        </Grid>
        {/* Budgets Listing */}
        <Grid item xs={12}>
          {budgetsListing}
        </Grid>
      </Grid>
    } />
  );
}
