import React from 'react';
import {branch} from 'baobab-react/higher-order';
@branch({
    user: [ 'user' ]
})
export class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {user} = this.props;
        return (
                <div className="card">
                    <h4 className="card-title text-center mb-4 mt-4">User Info</h4>
                    <div className="card-block w-50 pl-4 pr-4 mb-4 mt-2">
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Balance: {user.balance}</p>
                    </div>
                </div>
        )
    }
}