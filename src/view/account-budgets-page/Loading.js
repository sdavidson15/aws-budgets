/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    loading: {
      textAlign: 'center',
      flex: 1,
    },
  }));

export default function Loading() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.loading}>Loading...</Typography>
    </React.Fragment>
  );
}
