import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
  constructor(props) {
    super(props);
    this.classes = useStyles();
    this.getEditedBudgetAmount = props.getEditedBudgetAmount;
  }

  handleSubmit() {
    var budget = AppState.CurrentBudget();
    budget.budgetAmount = this.getEditedBudgetAmount();

    Controller.SetOptimisticBudget(budget);
    Controller.UpdateAccountBudgets([budget]);
    View.RenderBudgetPage();
  }

  handleCancel() {
    View.RenderBudgetPage();
  }

  render() {
    return (
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button className={this.classes.button} onClick={this.handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          className={this.classes.button}
          onClick={this.handleSubmit}
        >
          Confirm
        </Button>
      </Box>
    );
  }
}