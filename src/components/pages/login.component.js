import React from 'react';
import Formsy from 'formsy-react';
import { userService } from '../../data.manager';
import Input from '../common/input/input.component';

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
            this.props.transition.router.stateService.go('home');
        })
    }
    toggleButton(enable) {
        this.setState({enableSubmit: enable});
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <Formsy onValidSubmit={this.login} onValid={()=>this.toggleButton(true)} onInvalid={()=>this.toggleButton(false)} >
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
                    <button disabled={!this.state.enableSubmit} className="btn btn-primary" type="submit">Login</button>
                </Formsy>
            </div>
        )
    }
}