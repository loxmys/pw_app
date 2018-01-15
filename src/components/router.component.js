import React from 'react';
import {UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';
import {Login} from './pages/login.component';
import {Register} from './pages/register.component';

export class Router extends React.Component {
    states = [{
            name: 'login',
            url: '/login',
            component: Login
        },
        {
            name: 'register',
            url: '/register',
            component: Register
        }

    ];
    plugins = [
        pushStateLocationPlugin
    ];
    render() {
        return (
            <UIRouter plugins={this.plugins} states={this.states}>
                <UIView/>
            </UIRouter>
        );
    }
}