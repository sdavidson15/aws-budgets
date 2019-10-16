import React from 'react';

import Grid from '@material-ui/core/Grid';

import { defaultStyles } from './../DefaultStyles';
import AppState from './../../controller/State';
import BudgetsListing from './BudgetsListing';
import Loading from './Loading';
import MenuWrapper from './../menu/MenuWrapper';
import Search from './Search';
import Sort from './Sort';

export default class AccountBudgetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.classes = defaultStyles();
  }

  render() {
    let budgetsListing = (AppState.LoadingAccountBudgets()) ? <Loading /> : <BudgetsListing />;

    return (
      <MenuWrapper title='Account Budgets' inner={
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
