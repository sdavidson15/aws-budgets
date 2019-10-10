import clsx from 'clsx';
import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { defaultStyles } from './../DefaultStyles';
import Chart from '../budget-page/Chart';
import EditFields from './EditFields';
import FooterButtons from './FooterButtons';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import View from './../View';

export default function EditBudget() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(View.DrawerOpen());
  const fixedHeightChart = clsx(classes.paper, classes.chartFixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Edit Budget' />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightChart}>
                <Chart />
              </Paper>
            </Grid>
            {/* Edit Fields */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <EditFields />
              </Paper>
            </Grid>
            {/* Footer Buttons */}
            <Grid item xs={12}>
              <FooterButtons />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
