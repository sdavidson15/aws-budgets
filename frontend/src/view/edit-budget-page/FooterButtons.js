import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = {
  button: {
    width: 200,
    textTransform: 'none',
  },
};

function FooterButtons(props) {
  function handleSubmit() {
    var budget = AppState.CurrentBudget();
    budget.budgetAmount = props.getEditedBudgetAmount();

    Controller.SetOptimisticBudget(budget);
    Controller.UpdateAccountBudgets([budget]);
    View.RenderBudgetPage();
  }

  function handleCancel() {
    View.RenderBudgetPage();
  }

  const { classes } = props;
  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Button className={classes.button} onClick={handleCancel}>Cancel</Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Confirm
        </Button>
    </Box>
  );
}

export default withStyles(useStyles)(FooterButtons);