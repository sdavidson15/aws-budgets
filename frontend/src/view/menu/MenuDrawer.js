import clsx from 'clsx';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import { mainListItems, secondaryListItems } from './MenuItems';

const useStyles = theme => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
});

class MenuDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.open = props.open;
        this.setOpen = props.setOpen;
    }

    render() {
        const { classes } = this.props;
        let drawerClass = { paper: clsx(classes.drawerPaper, !this.open && classes.drawerPaperClose) };
        return (
            <Drawer
                variant="permanent"
                classes={drawerClass}
                open={this.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => this.setOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
        );
    }
}

export default withStyles(useStyles)(MenuDrawer);