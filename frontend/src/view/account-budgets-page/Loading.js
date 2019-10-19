/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  progress: {
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <React.Fragment>
        <CircularProgress className={classes.progress} />
      </React.Fragment>
    </Paper>
  );
}