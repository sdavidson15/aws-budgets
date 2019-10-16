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
  sortFixedHeight: {
    height: 100,
  },
}));

export default class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
  }

  render() {
    let paperClass = clsx(this.classes.paper, this.classes.sortFixedHeight);

    return (
      <Paper className={paperClass}>
        <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Sort
          </Typography>
          <TextField></TextField>
        </React.Fragment>
      </Paper>
    );
  }
}
