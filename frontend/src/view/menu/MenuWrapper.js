import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { defaultStyles } from './../DefaultStyles';
import MenuBar from './../menu/MenuBar';
import MenuDrawer from './../menu/MenuDrawer';

export default class MenuWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.inner = props.inner;
        this.classes = defaultStyles();
    }

    render() {
        const [open, setOpen] = React.useState(View.DrawerOpen());
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <MenuBar open={open} setOpen={setOpen} title={this.title} />
                <MenuDrawer open={open} setOpen={setOpen} />
                <main className={this.classes.content}>
                    <div className={this.classes.appBarSpacer} />
                    <Container maxWidth="lg" className={this.classes.container}>
                        {this.inner}
                    </Container>
                </main>
            </div>
        );
    }
}
