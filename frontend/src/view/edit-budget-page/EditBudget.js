import clsx from 'clsx';
import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { defaultStyles } from './../DefaultStyles';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import View from './../View';

export default function EditBudget() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(View.DrawerOpen());
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Reports' />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <Typography>Name (bold)</Typography>
                <Typography>Editable name box</Typography>
                <Typography>Budget amount (bold)</Typography>
                <Typography>Editable budget amount box</Typography>
                <Typography>12 month spend chart</Typography>
                <Typography>Alerts title line</Typography>
                <Typography>Alert threshold (locked in at percent)</Typography>
                <Typography>Editable email contacts list (add and remove)</Typography>
                <Typography>Create new alert button with the same fields</Typography>
                <Typography>Cancel and Confirm footer</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
