import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { defaultStyles } from './../DefaultStyles';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import ReportsListing from './ReportsListing';
import View from './../View';

export default function Reports() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(View.DrawerOpen());

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Reports' />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Reports Listing */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ReportsListing />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
