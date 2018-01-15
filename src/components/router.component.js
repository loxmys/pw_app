import React from 'react';
import {UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';
import {Login} from './pages/login.component';
import {Register} from './pages/register.component';
import {Home} from './pages/home.component';
import {userService} from '../data.manager';

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
        },
        {
            name: 'home',
            url: '/',
            component: Home,
            resolve: [
                { token: 'user', resolveFn: () => userService.userInfo() }
            ]
        }

    ];
    plugins = [
        pushStateLocationPlugin
    ];
    render() {
        return (
            <UIRouter  plugins={this.plugins} states={this.states} >
                <UIView />
            </UIRouter>
        );
    }
}