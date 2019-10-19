/* eslint-disable no-script-url */

import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  searchFixedHeight: {
    height: 100,
  },
}));

export default function Search() {
  const classes = useStyles();
  let paperClass = clsx(classes.paper, classes.searchFixedHeight);

  return (
    <Paper className={paperClass}>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Search
          </Typography>
        <TextField></TextField>
      </React.Fragment>
    </Paper>
  );
}
