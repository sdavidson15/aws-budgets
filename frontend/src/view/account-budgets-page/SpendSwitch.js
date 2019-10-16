/* eslint-disable no-script-url */

import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StyledSwitch } from './../DefaultStyles';
import View from './../View';

export default class SpendSwitch extends React.Component {
    constructor() {
        super(props);

        const [state, setState] = React.useState({
            checked: false,
        });

        this.state = state;
        this.setState = setState;
    }

    handleSwitchChange(name, event) {
        this.setState({ ...this.state, [name]: event.target.checked });
        View.ToggleSpendSwitchState();
    }

    render() {
        return (
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>
                        <StyledSwitch
                            checked={this.checked}
                            onChange={(event) => handleSwitchChange('checked', event)}
                            value="checked" />
                    </Grid>
                </Grid>
            </Typography>
        );
    }
}