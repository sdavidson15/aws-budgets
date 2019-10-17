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

class FooterButtons extends React.Component {
  constructor(props) {
    super(props);
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
    const { classes } = this.props;
    return (
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button className={classes.button} onClick={this.handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Confirm
        </Button>
      </Box>
    );
  }
}

export default withStyles(useStyles)(FooterButtons);