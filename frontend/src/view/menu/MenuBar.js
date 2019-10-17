import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
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

export default class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.classes = useStyles();
        this.open = props.open;
        this.setOpen = props.setOpen;
        this.title = props.title;
        this.budgetsEditable = props.budgetsEditable;
        this.getEditedBudgets = props.getEditedBudgets;
    }

    handleDrawerOpen() {
        this.setOpen(true);
        View.SetMenuDrawerOpen(true);
    };

    handleEditClick() {
        // Edit button appears on many pages when not editing.
        View.RenderEditablePage();
    }

    handleCancelClick() {
        // Cancel button only appears in the AccountBudgets page when editing.
        View.RenderAccountBudgetsPage();
    }

    handleSubmitClick() {
        // Submit button only appears in the AccountBudgets page when editing.
        // Collect all edited budgets to submit to the controller to update.
        var editedBudgets = this.getEditedBudgets(),
            budgets = [];

        for (var id in editedBudgets) {
            if (editedBudgets.hasOwnProperty(id))
                budgets.push(editedBudgets[id]);
        }

        Controller.UpdateAccountBudgets(budgets);
        View.RenderAccountBudgetsPage();
    }

    render() {
        let appBarClass = clsx(this.classes.appBar, this.open && this.classes.appBarShift);
        let menuButtonClass = clsx(this.classes.menuButton, this.open && this.classes.menuButtonHidden)

        let editButton = null,
            submitButton = null,
            cancelButton = null;

        // Conditional rendering
        if (View.CurrentPageIsEditable() && !this.budgetsEditable) {
            editButton = <IconButton color="inherit" onClick={this.handleEditClick}><EditIcon /></IconButton>
        }
        if (this.budgetsEditable) {
            cancelButton = <IconButton color="inherit" onClick={this.handleCancelClick}><CloseIcon /></IconButton>
            submitButton = <IconButton color="inherit" onClick={this.handleSubmitClick}><CheckIcon /></IconButton>
        }

        return (
            <AppBar position="absolute" className={appBarClass}>
                <Toolbar className={this.classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={menuButtonClass}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={this.classes.title}>
                        {this.title}
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
}