/* eslint-disable no-script-url */

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
}));

export default function Sort() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Sort
          </Typography>
        <TextField></TextField>
      </React.Fragment>
    </Paper>
  );
}
