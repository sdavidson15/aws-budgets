/* eslint-disable no-script-url */

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StyledSwitch } from './../DefaultStyles';
import View from './../View';

export default function SpendSwitch() {
    const [state, setState] = React.useState({
        checked: false,
    });


    function handleSwitchChange(name, event) {
        setState({ ...state, [name]: event.target.checked });
        View.ToggleSpendSwitchState();
    }

    return (
        <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                    <StyledSwitch
                        checked={state.checked}
                        onChange={(event) => handleSwitchChange('checked', event)}
                        value="checked" />
                </Grid>
            </Grid>
        </Typography>
    );
}