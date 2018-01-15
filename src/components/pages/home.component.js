import React from 'react';

export class Home extends React.Component {
    render() {
        const {user} = this.props.resolves;
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <h3>{user.balance}</h3>
            </div>
        )
    }
}