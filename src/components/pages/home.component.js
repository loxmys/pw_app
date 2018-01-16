import React from 'react';
import {TokenService} from "../../services/token.service";
import {branch} from 'baobab-react/higher-order';
@branch({
    user: [ 'user' ],
    userList: ['userList']
})
export class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    logout() {
        TokenService.removeToken();
        this.props.transition.router.stateService.go('login');
    }
    render() {
        const {user} = this.props;
        return (
                <div className="card">
                    <div className="card-block w-50 mr-auto ml-auto mb-5 mt-2">
                        <h4 className="card-title text-center mb-4 mt-4">User Info</h4>
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                        <h3>{user.balance}</h3>
                        <button className="btn btn-primary" onClick={()=>this.logout()}>logout</button>
                    </div>
                </div>
        )
    }
}