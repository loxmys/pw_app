import React from 'react';
import { UISref } from '@uirouter/react';
import {branch} from 'baobab-react/higher-order';
import {TokenService} from "../../../services/token.service";
@branch({
    user: [ 'user' ],
})
export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        TokenService.removeToken();
        this.props.transaction.router.stateService.go('login');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <UISref to="internal.transactions">
                            <a className="nav-link">Home</a>
                        </UISref>
                    </li>
                    <li className="nav-item">
                        <UISref to="internal.transaction-list">
                            <a className="nav-link">Transaction List</a>
                        </UISref>
                    </li>
                    <li className="nav-item">
                        <UISref to="internal.new-transaction">
                            <a className="nav-link">New Transaction</a>
                        </UISref>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <span className="navbar-text">User Name: {this.props.user.name}  </span>
                    <span className="navbar-text">Balance: {this.props.user.balance}</span>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={()=>this.logout()}>logout</a>
                    </li>
                </ul>
            </nav>
        );
    }
}