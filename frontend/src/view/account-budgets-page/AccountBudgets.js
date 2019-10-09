import clsx from 'clsx';
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { defaultStyles } from './../DefaultStyles';
import { mainListItems, secondaryListItems } from './../menu/MenuItems';
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightSearchSort = clsx(classes.paper, classes.searchfixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Account Budgets
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
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
