import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { defaultStyles } from './../DefaultStyles';
import AppState from '../../controller/State';
import MenuBar from '../menu/MenuBar';
import MenuDrawer from '../menu/MenuDrawer';
import ReportBody from './ReportBody';
import Summary from './Summary';
import View from './../View';

export default function Report() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(View.DrawerOpen());

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title={AppState.CurrentReport().name} />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Report Body */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ReportBody />
              </Paper>
            </Grid>
            {/* Summary */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Summary />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
