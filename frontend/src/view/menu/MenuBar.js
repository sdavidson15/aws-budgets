import clsx from 'clsx';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Controller from './../../controller/Controller';
import View from './../View';

const useStyles = theme => ({
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
});

function MenuBar(props) {
    function handleEditClick() {
        // Edit button appears on many pages when not editing.
        View.RenderEditablePage();
    }

    function handleCancelClick() {
        // Cancel button only appears in the AccountBudgets page when editing.
        View.RenderAccountBudgetsPage();
    }

    function handleSubmitClick() {
        // Submit button only appears in the AccountBudgets page when editing.
        // Collect all edited budgets to submit to the controller to update.
        var editedBudgets = props.getEditedBudgets(),
            budgets = [];

        for (var id in editedBudgets) {
            if (editedBudgets.hasOwnProperty(id))
                budgets.push(editedBudgets[id]);
        }

        Controller.UpdateAccountBudgets(budgets);
        View.RenderAccountBudgetsPage();
    }

    const { classes } = props;
    let appBarClass = clsx(classes.appBar, props.open && classes.appBarShift);
    let menuButtonClass = clsx(classes.menuButton, props.open && classes.menuButtonHidden)

    let editButton = null,
        submitButton = null,
        cancelButton = null;

    // Conditional rendering
    if (View.CurrentPageIsEditable() && !props.budgetsEditable) {
        editButton = <IconButton color="inherit" onClick={handleEditClick}><EditIcon /></IconButton>
    }
    if (props.budgetsEditable) {
        cancelButton = <IconButton color="inherit" onClick={handleCancelClick}><CloseIcon /></IconButton>
        submitButton = <IconButton color="inherit" onClick={handleSubmitClick}><CheckIcon /></IconButton>
    }

    return (
        <AppBar position="absolute" className={appBarClass}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.setOpen(true)}
                    className={menuButtonClass}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {props.title}
                </Typography>
                {editButton}
                {cancelButton}
                {submitButton}
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(useStyles)(MenuBar);