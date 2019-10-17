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

class BudgetName extends React.Component {
  constructor(props) {
    super(props);
    this.budget = props.budget;
  }

  handleBudgetNameClick() {
    Controller.LoadBudget(this.budget.id);
    View.RenderBudgetPage();
  }

  render() {
    const { classes } = this.props;
    return (
      <Button className={classes.button} onClick={this.handleBudgetNameClick}>
        {this.budget.name}
      </Button>
    );
  }
}

export default withStyles(useStyles)(BudgetName);