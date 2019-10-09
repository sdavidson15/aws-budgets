import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import View from './../View';

function onEditClick() {
    View.HandleEditClick();
}

function showEditIcon() {
    if (View.CurrentPageIsEditable()) return {};
    return {
        display: "none",
    }
}

const overrideStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 240,
        width: `calc(100% - 240px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuBar(args) {
    const classes = overrideStyles();
    var open = args.open;
    const handleDrawerOpen = () => {
        args.setOpen(true);
        View.SetDrawerOpen(true);
    };

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {args.title}
                </Typography>
                <IconButton color="inherit" style={showEditIcon()} onClick={onEditClick}>
                    <EditIcon />
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}