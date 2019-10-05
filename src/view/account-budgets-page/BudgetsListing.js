/* eslint-disable no-script-url */

import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppState from './../../controller/State';
import Controller from './../../controller/Controller';
import View from './../View';
import Formatters from './../../model/Formatters';

function onBudgetNameClick(accountId, name) {
  Controller.LoadBudget(accountId, name);
  View.RenderBudgetPage();
}

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    textAlign: 'left',
    margin: theme.spacing(1),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

// TODO: pull this into it's own file
const StyledSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 8,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function BudgetHistory() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: false,
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
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

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>Budget Name</TableCell>
            <TableCell>Budget Amount ($)</TableCell>
            <TableCell>Current Spend ($)</TableCell>
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
              <TableCell>{Formatters.numToCurrencyString(row.budgetAmount)}</TableCell>
              <TableCell>{Formatters.numToCurrencyString(row.currentSpend)}</TableCell>
              <TableCell>
                <Paper style={getSpendProgressColor(row.currentSpend, row.budgetAmount)}>
                  @
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="https://en.wikipedia.org/wiki/Special:Random">
          Load more budgets
        </Link>
      </div>
    </React.Fragment>
  );
}
