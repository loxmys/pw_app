import React from 'react';
import {UIRouter, UIView, pushStateLocationPlugin} from '@uirouter/react';
import {Login} from './pages/login.component';
import {Register} from './pages/register.component';
import {Home} from './pages/home.component';
import {userService} from '../data.manager';
import {Internal} from "./pages/internal.component";
import {TransactionList} from "./pages/transaction-list.component";
import {transactionService} from "../data.manager";
import {NewTransaction} from "./pages/new-transaction.component";

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
            name: 'internal',
            url: '',
            redirectTo:'internal.transactions',
            component: Internal,
            resolve: [
                { token: 'user', resolveFn: () => userService.userInfo() }
            ]
        },
        {
            name: 'internal.transactions',
            url: '/transactions',
            component: Home
        },
        {
            name: 'internal.new-transaction',
            url: '/new-transaction?:username?:amount',
            component: NewTransaction,
        },
        {
            name: 'internal.transaction-list',
            url: '/transaction-List',
            component: TransactionList,
            resolve: [
                { token: 'transactionList', resolveFn: () => transactionService.getTransactionList() }
            ]
        },

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