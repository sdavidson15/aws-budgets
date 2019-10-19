/* eslint-disable no-script-url */

import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { NumToCurrencyString } from './../../model/Formatters';

export default function BudgetAmount(props) {
    function handleBudgetAmountChange(e) {
        props.budget.budgetAmount = parseFloat(e.target.value);
        props.addEditedBudget(props.budget);
    }

    let suggestion = ("Suggested: ").concat(NumToCurrencyString(props.budget.suggestedBudget));
    let budgetAmountElement = NumToCurrencyString(props.budget.budgetAmount);

    if (props.budgetsEditable && props.budget.budgetAmount === props.budget.suggestedBudget) {
        budgetAmountElement = (
            <TextField
                fullWidth
                defaultValue={props.budget.budgetAmount}
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                onChange={handleBudgetAmountChange}
            />
        );
    } else if (props.budgetsEditable) {
        budgetAmountElement = (
            <Tooltip title={suggestion}>
                <TextField
                    error
                    fullWidth
                    defaultValue={props.budget.budgetAmount}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    onChange={handleBudgetAmountChange}
                />
            </Tooltip>
        );
    }

    return budgetAmountElement;
}