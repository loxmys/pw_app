import React from 'react';
import {branch} from 'baobab-react/higher-order';
import UserSearch from "../common/usersearch/usersearch.component";
import Formsy from 'formsy-react';
import Input from '../common/input/input.component';
import { addValidationRule } from 'formsy-react';
import {transactionService, userService} from "../../data.manager";
@branch({
    user: [ 'user' ],
    userList: ['userList']
})
export class NewTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            findUserState: '',
            enableSubmit: false
        };
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(props.transition.router.stateService.params);
        addValidationRule('max', function (values, value, otherField) {
            return Number(value) <= Number(otherField);
        });
    }

    handleSubmit(event) {
        transactionService.createTransaction(event.username, event.amount).then(() => {
            userService.userInfo();
            this.props.transition.router.stateService.go('internal.transaction-list');
        }).catch(() => {
        });
    }

    setSelectedUser(findUserState) {
        this.setState({findUserState: findUserState});
    }

    toggleButton(enable) {
        this.setState({enableSubmit: enable});
    }

    render() {
        const {user} = this.props;
        const {username, amount} = this.props.transition.router.stateService.params;
        return (
            <div className="card">
                <div className="card-block w-50 mr-auto ml-auto mb-5 mt-2">
                    <h4 className="card-title text-center mb-4 mt-4">New transaction</h4>
                    <Formsy className="form-group row w-100" onValidSubmit={this.handleSubmit}
                            onValid={()=>this.toggleButton(true)}
                            onInvalid={()=>this.toggleButton(false)} >
                        <div className="col-md-6">
                            <label>Find user</label>
                            <UserSearch
                                name="username"
                                type="text"
                                defaultValue={username || ''}
                                placeholder="Find User"
                                onUserSelect={this.setSelectedUser}
                                required/>
                        </div>
                        <div className="col-md-6">
                            <label>Amount</label>
                            <Input
                                    defaultValue={amount || 0}
                                    validations={{max:user.balance}}
                                    type="number"
                                    name="amount"
                                    validationError="Transaction amount  greater than the current balance"
                                    placeholder="Amount"
                                    required />
                        </div>
                        <button disabled={!this.state.enableSubmit} className="btn btn-primary mx-auto mt-4" type="submit">Send</button>
                    </Formsy>
                </div>
            </div>
        )
    }
}