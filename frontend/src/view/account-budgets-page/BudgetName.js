/* eslint-disable no-script-url */

import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
});

function BudgetName(props) {
  function handleBudgetNameClick() {
    Controller.LoadBudget(props.budget.id);
    View.RenderBudgetPage();
  }

  const { classes } = props;
  return (
    <Button className={classes.button} onClick={handleBudgetNameClick}>
      {props.budget.name}
    </Button>
  );
}

export default withStyles(useStyles)(BudgetName);