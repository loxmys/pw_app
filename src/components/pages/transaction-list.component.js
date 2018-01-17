import React from 'react';

import {branch} from 'baobab-react/higher-order';
import {UISref} from "@uirouter/react";

@branch({
    transactionList: ['transactionList'],
})
export class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    render() {
        const {query} = this.state;
        return (
            <table className="table table-striped transaction-list">
                <thead>
                <tr>
                    <th>Date</th>
                    <th className="d-flex">
                        <span className="mr-2">Name:</span>
                        <input className="form-control w-50 username-filter "
                               onChange={(e) => this.setState({query: e.target.value})} type="search"
                               placeholder="Filter by name"/>
                    </th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Repeat transaction</th>
                </tr>
                </thead>
                <tbody>
                {this.props.resolves.transactionList
                    .filter(transaction => !query || new RegExp(query, 'img').test(transaction.username))
                    .map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.username}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.balance}</td>
                            <td>
                                <UISref
                                    to="internal.new-transaction"
                                    params={{username: transaction.username, amount: transaction.amount}}>
                                    <button className="btn btn-primary btn-sm">Repeat transaction</button>
                                </UISref>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}