/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  loading: {
    textAlign: 'center',
    flex: 1,
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
    <React.Fragment>
      <CircularProgress className={classes.progress} />
    </React.Fragment>
  );
}
