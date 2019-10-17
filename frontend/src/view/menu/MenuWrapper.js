import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';
import View from './../View';

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

function MenuWrapper(props) {
    const { classes } = props;
    const [open, setStateOpen] = React.useState(View.MenuDrawerOpen());
    function setOpen(open) {
        View.SetMenuDrawerOpen(open);
        setStateOpen(open);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MenuBar
                open={open}
                setOpen={setOpen}
                title={props.title}
                budgetsEditable={props.budgetsEditable}
            />
            <MenuDrawer open={open} setOpen={setOpen} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {props.inner}
                </Container>
            </main>
        </div>
    );
}

export default withStyles(useStyles)(MenuWrapper);
