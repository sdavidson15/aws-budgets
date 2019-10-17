/* eslint-disable no-script-url */

import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { NumToCurrencyString } from './../../model/Formatters';

export default class BudgetAmount extends React.Component {
    constructor(props) {
        super(props);
        this.budget = props.budget;
        this.budgetsEditable = props.budgetsEditable;
        this.addEditedBudget = props.addEditedBudget;
    }

    handleBudgetAmountChange(e) {
        this.budget.budgetAmount = parseFloat(e.target.value);
        this.addEditedBudget(this.budget);
    }

    render() {
        let suggestion = ("Suggested: ").concat(NumToCurrencyString(this.budget.suggestedBudget));
        let budgetAmountElement = NumToCurrencyString(this.budget.budgetAmount);

        // Conditional rendering
        if (this.budgetsEditable && this.budget.budgetAmount === this.budget.suggestedBudget) {
            budgetAmountElement = (
                <TextField
                    fullWidth
                    defaultValue={this.budget.budgetAmount}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    onChange={this.handleBudgetAmountChange}
                />
            );
        } else if (this.budgetsEditable) {
            budgetAmountElement = (
                <Tooltip title={suggestion}>
                    <TextField
                        error
                        fullWidth
                        defaultValue={this.budget.budgetAmount}
                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                        onChange={this.handleBudgetAmountChange}
                    />
                </Tooltip>
            );
        }

        return ({ budgetAmountElement });
    }
}