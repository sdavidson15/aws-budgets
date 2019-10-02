/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './../budget-page/Title'; // FIXME: pull this into somewhere more reusable

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Search() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Search</Title>
      <Typography component="p" variant="h6">
        Placeholder
      </Typography>
    </React.Fragment>
  );
}
