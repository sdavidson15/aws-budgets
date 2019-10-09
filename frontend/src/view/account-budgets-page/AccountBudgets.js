import clsx from 'clsx';
import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import { defaultStyles } from './../DefaultStyles';
import { mainListItems, secondaryListItems } from './../menu/MenuItems';
import MenuBar from '../menu/MenuBar';
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
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightSearchSort = clsx(classes.paper, classes.searchfixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Account Budgets'/>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
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
