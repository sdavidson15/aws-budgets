import clsx from 'clsx';
import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

import { defaultStyles } from './../DefaultStyles';
import AppState from '../../controller/State';
import Chart from '../budget-page/Chart';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import Title from '../budget-page/Title';
import View from './../View';

export default function EditBudget() {
  const classes = defaultStyles();
  const [open, setOpen] = React.useState(View.DrawerOpen());
  const fixedHeightChart = clsx(classes.paper, classes.chartFixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar open={open} setOpen={setOpen} title='Edit Budget' />
      <MenuDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightChart}>
                <Chart />
              </Paper>
            </Grid>
            {/* Edit Fields */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Budget details</Title>
                <Typography>
                  <Box mt={3} mb={1} fontWeight="fontWeightBold">Name</Box>
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={AppState.BudgetName()}
                  variant="outlined"
                />
                <Typography>
                  <Box mt={3} mb={1} fontWeight="fontWeightBold">Budget Amount</Box>
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={AppState.BudgetAmount()}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                {/* Email Alerts */}
                <Typography style={{ textAlign: "center" }}>
                  <Box mt={5} mb={1} fontWeight="fontWeightBold">Configure alerts</Box>
                </Typography>
                <Divider />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ width: 200, textTransform: "none" }}
                    endIcon={<DeleteIcon />}
                  >
                    Remove Alert
                  </Button>
                </Box>
                <Typography>
                  <Box mb={1} fontWeight="fontWeightBold">Alert threshold</Box>
                </Typography>
                <TextField
                  style={{ width: 400 }}
                  defaultValue={AppState.AlertThreshold()}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">% of budgeted amount</InputAdornment>,
                  }}
                />
                <Typography>
                  <Box mt={3} mb={2} fontWeight="fontWeightBold">Email contacts</Box>
                </Typography>
                {AppState.AlertEmails().map(email => (
                  <Box mb={2}>
                    <TextField
                      style={{ width: 400 }}
                      defaultValue={email}
                      variant="outlined"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>,
                      }}
                    />
                  </Box>
                ))}
                <Box mb={2}>
                  <Button
                    variant="contained"
                    style={{ width: 200, textTransform: "none" }}
                  >
                    Add email contact
                  </Button>
                </Box>
                <Divider />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    style={{ width: 200, textTransform: "none" }}
                    startIcon={<AddIcon />}
                  >
                    Add new alert
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button style={{ width: 200, textTransform: "none" }}>Cancel</Button>
                <Button variant="contained" color="primary" style={{ width: 200, textTransform: "none" }}>Confirm</Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
