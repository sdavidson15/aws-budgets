/* eslint-disable no-script-url */

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StyledSwitch } from './../DefaultStyles';

export default function SpendSwitch(props) {
    function handleSwitchChange(name, event) {
        props.setState({ ...props.state, [name]: event.target.checked });
    }

    return (
        <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                    <StyledSwitch
                        checked={props.state.checked}
                        onChange={(event) => handleSwitchChange('checked', event)}
                        value="checked" />
                </Grid>
            </Grid>
        </Typography>
    );
}