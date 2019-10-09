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
import Typography from '@material-ui/core/Typography';

import { defaultStyles } from './../DefaultStyles';
import { mainListItems, secondaryListItems } from './../menu/MenuItems';
import MenuBar from './../menu/MenuBar';

export default function Dashboard() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='AWS Budget Manager' />
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
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <Typography>Homepage</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
