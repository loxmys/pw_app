import React from 'react';
import Formsy from 'formsy-react';
import { userService } from '../../data.manager';
import Input from '../common/input/input.component';
import {Messages} from "../common/messages/messages.component";
import {UISref} from "@uirouter/react";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSubmit: false
        };
        this.register = this.register.bind(this);
    }
    register(data) {
        const {username, email, password} = data;
        userService.register(username, email, password).then(() => {
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
                    <h1 className="card-title text-center">Register</h1>
                    <Formsy className="text-center" onValidSubmit={this.register} onValid={()=>this.toggleButton(true)} onInvalid={()=>this.toggleButton(false)} >
                        <Input type="text"
                               name="username"
                               placeholder="username"
                               required />
                        <Input type="email"
                               name="email"
                               placeholder="email"
                               validations="isEmail"
                               validationError="This is not a valid email"
                               required />
                        <Input type="password"
                               name="password"
                               placeholder="password"
                               required />
                        <button disabled={!this.state.enableSubmit} className="btn btn-primary" type="submit">Register</button>
                        <div className="mt-2">
                            You already have an account?
                            <UISref to="login">
                                <a> Login</a>
                            </UISref>
                        </div>
                    </Formsy>
                </div>
            </div>
        )
    }
}