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

export default class BudgetName extends React.Component {
  constructor(props) {
    super(props);

    this.classes = useStyles();
    this.budget = props.budget;
  }

  handleBudgetNameClick() {
    Controller.LoadBudget(this.budget.id);
    View.RenderBudgetPage();
  }

  render() {
    return (
      <Button className={this.classes.button} onClick={this.handleBudgetNameClick}>
        {this.budget.name}
      </Button>
    );
  }
}