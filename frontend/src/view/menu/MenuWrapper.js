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

class MenuWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.inner = props.inner;
        this.budgetsEditable = (props.budgetsEditable) ? props.budgetsEditable : false;
        this.open = View.MenuDrawerOpen();
    }

    setOpen = (open) => {
        View.SetMenuDrawerOpen(open);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <MenuBar
                    open={this.open}
                    setOpen={this.setOpen}
                    title={this.title}
                    budgetsEditable={this.budgetsEditable}
                />
                <MenuDrawer open={this.open} setOpen={this.setOpen} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {this.inner}
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(MenuWrapper);
