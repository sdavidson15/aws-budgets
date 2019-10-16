/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default class Loading extends React.Component {
  constructor() {
    super(props);
    this.classes = useStyles();
  }

  render() {
    return (
      <Paper className={this.classes.paper}>
        <React.Fragment>
          <CircularProgress className={this.classes.progress} />
        </React.Fragment>
      </Paper>
    );
  }
}
