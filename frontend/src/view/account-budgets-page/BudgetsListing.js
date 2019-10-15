/* eslint-disable no-script-url */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppState from './../../controller/State';
import Button from '@material-ui/core/Button';
import Controller from './../../controller/Controller';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { StyledSwitch } from './../DefaultStyles';
import Formatters from './../../model/Formatters';
import View from './../View';

function handleBudgetAmountChange(e, row) {
  row.budgetAmount = parseFloat(e.target.value);
  View.AddBudgetEdit(row);
}

function onBudgetNameClick(accountId, name) {
  Controller.LoadBudget(accountId, name);
  View.RenderBudgetPage();
}

function getSpendProgressColor(spend, budgetAmount) {
  let spendColor = 'red';
  if (spend < budgetAmount) {
    let percent = spend / budgetAmount;
    let greenNum = (spend < budgetAmount / 2) ? 255 : (1 - percent) * 255 * 2;
    let redNum = (spend > budgetAmount / 2) ? 255 : percent * 255 * 2;
    let g = greenNum.toFixed(0).toString();
    let r = redNum.toFixed(0).toString();
    spendColor = ('rgb(').concat(r, ', ', g, ', 0)');
  }

  return {
    background: spendColor,
    color: spendColor,
  };
}

// TODO: pull this (and the outlined text fields from EditFields) into their own DefaultElements file.
function getBudgetAmountElement(row) {
  if (View.EditAccountBudgets() && row.budgetAmount === row.suggestedBudget) {
    return (
      <TextField
        fullWidth
        defaultValue={row.budgetAmount}
        InputProps={{
          startAdornment:
            <InputAdornment position="start">
              $
            </InputAdornment>
        }}
        onChange={(e) => handleBudgetAmountChange(e, row)}
      />)
  } else if (View.EditAccountBudgets()) {
    var suggestion = ("Suggested: ").concat(Formatters.numToCurrencyString(row.suggestedBudget));
    return (
      <Tooltip title={suggestion}>
        <TextField
          error
          fullWidth
          defaultValue={row.budgetAmount}
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                $
              </InputAdornment>
          }}
          onChange={(e) => handleBudgetAmountChange(e, row)}
        />
      </Tooltip>
    )
  }
  return Formatters.numToCurrencyString(row.budgetAmount);
}

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
}));

export default function BudgetsListing() {
  const [state, setState] = React.useState({
    checked: false,
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>Budget Name</TableCell>
            <TableCell>Budget Amount ($)</TableCell>
            <TableCell>
              {(state.checked) ? "Forecasted Spend ($)" : "Current Spend ($)"}
            </TableCell>
            <TableCell>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>
                    <StyledSwitch checked={state.checked} onChange={handleChange('checked')} value="checked" />
                  </Grid>
                </Grid>
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AppState.AccountBudgets().map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.accountId}</TableCell>
              <TableCell>
                <Button className={classes.button} onClick={() => onBudgetNameClick(row.accountId, row.name)}>
                  {row.name}
                </Button>
              </TableCell>
              <TableCell>{getBudgetAmountElement(row)}</TableCell>
              <TableCell>
                {Formatters.numToCurrencyString((state.checked) ? row.forecastedSpend : row.currentSpend)}
              </TableCell>
              <TableCell>
                <Paper style={getSpendProgressColor((state.checked) ? row.forecastedSpend : row.currentSpend, row.budgetAmount)}>
                  @
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
