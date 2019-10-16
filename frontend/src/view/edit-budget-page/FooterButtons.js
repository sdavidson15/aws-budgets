import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { FormatAccountBudgetsData } from './../../model/Formatters';
import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = makeStyles({
  button: {
    width: 200,
    textTransform: 'none',
  },
});

export default class FooterButtons extends React.Component {
  constructor() {
    super(props);
    this.classes = useStyles();
  }

  handleSubmit() {
    var budget = FormatAccountBudgetsData(
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

  handleCancel() {
    View.RenderBudgetPage();
  }

  render() {
    return (
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button className={this.classes.button} onClick={handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          className={this.classes.button}
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </Box>
    );
  }
}