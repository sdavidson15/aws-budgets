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
import AppState from '../../controller/State';
import BudgetHistory from './BudgetHistory';
import Chart from './Chart';
import CurrentSpend from './CurrentSpend';
import ForecastedSpend from './ForecastedSpend';
import MenuBar from '../menu/MenuBar';

export default function Budget() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightChart = clsx(classes.paper, classes.chartFixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title={AppState.BudgetName()} />
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
            {/* Current Spend */}
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <CurrentSpend />
              </Paper>
            </Grid>
            {/* Forecasted Spend */}
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <ForecastedSpend />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightChart}>
                <Chart />
              </Paper>
            </Grid>
            {/* Budget History */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <BudgetHistory />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
