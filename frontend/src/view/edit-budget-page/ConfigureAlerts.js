/* eslint-disable no-script-url */

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

import AppState from './../../controller/State';

const useStyles = theme => ({
  button: {
    width: 200,
    textTransform: 'none',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textBox: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textBoxCentered: {
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  textInput: {
    width: 400,
    marginBottom: theme.spacing(2),
  },
});

function ConfigureAlerts(props) {
  const { classes } = props;
  return (
    <div>
      <Typography className={classes.textBoxCentered}>
        Configure alerts
        </Typography>
      <Divider />
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.button} color="primary" variant="contained">
          Remove Alert
          </Button>
      </Box>
      <Typography className={classes.textBox}>
        Alert threshold
        </Typography>
      <TextField
        className={classes.textInput}
        variant="outlined"
        defaultValue={AppState.AlertThreshold()}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              % of budgeted amount
              </InputAdornment>
        }}
      />
      <Typography className={classes.textBox}>
        Email contacts
        </Typography>
      {AppState.AlertEmails().map(email => (
        <Box key={email.concat('-key')}>
          <TextField
            className={classes.textInput}
            variant="outlined"
            defaultValue={email}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>,
            }}
          />
        </Box>
      ))}
      <Button className={classes.button} variant="contained">
        Add email contact
        </Button>
      <Divider />
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.button} variant="contained" startIcon={<AddIcon />}>
          Add new alert
          </Button>
      </Box>
    </div>
  );
}

export default withStyles(useStyles)(ConfigureAlerts);