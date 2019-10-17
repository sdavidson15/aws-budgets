import React from 'react';

import Grid from '@material-ui/core/Grid';

import AppState from './../../controller/State';
import BudgetsListing from './BudgetsListing';
import Loading from './Loading';
import MenuWrapper from './../menu/MenuWrapper';
import Search from './Search';
import Sort from './Sort';

export default class AccountBudgetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.budgetsEditable = props.budgetsEditable;
    this.editedBudgets = {};
  }

  addEditedBudget(budget) {
    if (this.budgetsEditable)
      this.editedBudgets[budget.id] = budget;
  }

  render() {
    let budgetsListing = <BudgetsListing budgetsEditable={this.budgetsEditable} addEditedBudget={this.addEditedBudget} />;
    if (AppState.LoadingAccountBudgets()) {
      budgetsListing = <Loading />;
    }

    return (
      <MenuWrapper title='Account Budgets' budgetsEditable={this.budgetsEditable} inner={
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
}
