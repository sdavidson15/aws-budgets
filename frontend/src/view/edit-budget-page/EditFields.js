/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

import AppState from './../../controller/State';
import ConfigureAlerts from './ConfigureAlerts';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  textBox: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function EditFields(props) {
  function handleEditBudgetAmount(e) {
    props.setEditedBudgetAmount(parseFloat(e.target.value));
  }

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Budget details
        </Typography>
      <Typography className={classes.textBox}>Name</Typography>
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={AppState.CurrentBudget().name}
      />
      <Typography className={classes.textBox}>Budget Amount</Typography>
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={AppState.CurrentBudget().budgetAmount}
        InputProps={{
          startAdornment:
            <InputAdornment position="start">
              $
            </InputAdornment>,
        }}
        onChange={handleEditBudgetAmount}
      />
      {/* Configure Alerts */}
      <ConfigureAlerts />
    </Paper>
  );
}