import React from 'react';

import {branch} from 'baobab-react/higher-order';
import {UISref} from "@uirouter/react";
@branch({
    transactionList: [ 'transactionList' ],
})
export class TransactionList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    render() {
        return (
            <div>
                <input className="form-control" onChange={(e)=>this.setState({query: e.target.value})} type="search" placeholder="filter by name"/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Repeat transaction</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.resolves.transactionList.filter(transaction=> !this.state.query || new RegExp(this.state.query,'img').test(transaction.username)).map(transaction=>(
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.username}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.balance}</td>
                            <td> <UISref  to="internal.new-transaction" params={{username: transaction.username, amount: transaction.amount}}><button className="btns">Repeat transaction</button></UISref> </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}