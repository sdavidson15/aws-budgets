import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import { mainListItems, secondaryListItems } from './MenuItems';
import View from './../View';

const useStyles = makeStyles(theme => ({
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
}));

export default class MenuDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.classes = useStyles();
        this.open = props.open;
        this.setOpen = props.setOpen;
    }

    handleDrawerClose() {
        this.setOpen(false);
        View.SetMenuDrawerOpen(false);
    };

    render() {
        let drawerClass = { paper: clsx(this.classes.drawerPaper, !this.open && this.classes.drawerPaperClose) };
        return (
            <Drawer
                variant="permanent"
                classes={drawerClass}
                open={this.open}
            >
                <div className={this.classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
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