/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

import AppState from '../../controller/State';
import ConfigureAlerts from './ConfigureAlerts';
import Title from '../budget-page/Title';
import View from '../View';

function handleBudgetAmountChange(e) {
  View.SetEditFieldBudgetAmount(parseFloat(e.target.value));
}

const useStyles = makeStyles(theme => ({
  textBox: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function EditFields() {
  const classes = useStyles();
  const OutlinedTextField = function (args) {
    return (
      <TextField
        fullWidth
        variant="outlined"
        defaultValue={args.defaultValue}
        InputProps={args.InputProps}
        onChange={args.onChange}
      />
    );
  }

  return (
    <div>
      <Title>Budget details</Title>
      <Typography className={classes.textBox}>
        Name
      </Typography>
      <OutlinedTextField
        defaultValue={AppState.BudgetName()}
      />
      <Typography className={classes.textBox}>
        Budget Amount
      </Typography>
      <OutlinedTextField
        defaultValue={AppState.BudgetAmount()}
        InputProps={{
          startAdornment:
            <InputAdornment position="start">
              $
            </InputAdornment>,
        }}
        onChange={handleBudgetAmountChange}
      />
      {/* Configure Alerts */}
      <ConfigureAlerts />
    </div>
  );
}