import clsx from 'clsx';
import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { defaultStyles } from './../DefaultStyles';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import AppState from './../../controller/State';
import BudgetsListing from './BudgetsListing';
import Loading from './Loading';
import Search from './Search';
import Sort from './Sort';

function viewBudgetsOrLoading() {
  if (AppState.LoadingAccountBudgets())
    return (<Loading />);
  return (<BudgetsListing />);
}

export default function AccountBudgets() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(true);
  const fixedHeightSearchSort = clsx(classes.paper, classes.searchfixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Account Budgets' />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Search */}
            <Grid item xs={8}>
              <Paper className={fixedHeightSearchSort}>
                <Search />
              </Paper>
            </Grid>
            {/* Sort */}
            <Grid item xs={4}>
              <Paper className={fixedHeightSearchSort}>
                <Sort />
              </Paper>
            </Grid>
            {/* Budgets Listing */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {viewBudgetsOrLoading()}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
