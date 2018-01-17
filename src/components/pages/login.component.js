import React from 'react';
import Formsy from 'formsy-react';
import { userService } from '../../data.manager';
import Input from '../common/input/input.component';
import { UISref } from '@uirouter/react';
import {Messages} from "../common/messages/messages.component";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enableSubmit: false
        };
        this.login = this.login.bind(this);
    }
    login(data) {
        const {email, password} = data;
        userService.login(email, password).then(() => {
            this.props.transition.router.stateService.go('internal');
        })
    }
    toggleButton(enable) {
        this.setState({enableSubmit: enable});
    }
    render() {
        return (
            <div>
                <Messages/>
                <div className="card mx-auto mt-4 p-4 col-md-6">
                    <h1 className="card-title text-center">Login</h1>
                    <Formsy className="text-center" onValidSubmit={this.login} onValid={()=>this.toggleButton(true)} onInvalid={()=>this.toggleButton(false)} >
                        <Input type="email"
                               name="email"
                               validations="isEmail"
                               placeholder="email"
                               validationError="This is not a valid email"
                               required />
                        <Input type="password"
                               name="password"
                               placeholder="password"
                               required />
                        <button disabled={!this.state.enableSubmit} className="btn btn-primary test-center mx-auto" type="submit">Login</button>
                        <div className="mt-2">
                            Don't have an account?
                            <UISref to="register">
                                <a> Sign Up</a>
                            </UISref>
                        </div>
                    </Formsy>
                </div>
            </div>
        )
    }
}