/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
}));

export default function BudgetName(props) {
  function handleBudgetNameClick() {
    Controller.LoadBudget(props.budget.UUID);
    View.RenderBudgetPage();
  }

  const classes = useStyles();
  return (
    <Button className={classes.button} onClick={handleBudgetNameClick}>
      {props.budget.BudgetName}
    </Button>
  );
}