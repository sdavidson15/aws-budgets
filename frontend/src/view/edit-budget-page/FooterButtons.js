import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import Formatters from '../../model/Formatters';
import View from './../View';

function onCancel() {
  View.RenderBudgetPage();
}

function onSubmit() {
  var budget = Formatters.formatAccountBudgetsData(
    0,
    AppState.AccountID(),
    AppState.BudgetName(),
    View.EditFieldBudgetAmount(),
    AppState.SuggestedBudget(),
    AppState.CurrentSpend(),
    AppState.ForecastedSpend(),
    AppState.BudgetHistory()
  );

  Controller.UpdateAccountBudgets([budget]);
  AppState.SetBudgetAmount(View.EditFieldBudgetAmount());
  View.RenderBudgetPage();
}

const useStyles = makeStyles({
  button: {
    width: 200,
    textTransform: 'none',
  },
});

export default function FooterButtons() {
  const classes = useStyles();
  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Button className={classes.button} onClick={onCancel}>Cancel</Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onSubmit}
      >
        Confirm
      </Button>
    </Box>
  )
}