import React from 'react';
import Formsy from 'formsy-react';
import { userService } from '../../data.manager';
import Input from '../common/input/input.component';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enableSubmit: false
        };
        console.log(this.props);
        this.register = this.register.bind(this);
    }
    register(data) {

        const {username, email, password} = data;
        userService.register(username, email, password).then(() => {
            this.props.transition.router.stateService.go('home');
        })
    }
    toggleButton(enable) {
        this.setState({enableSubmit: enable});
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Formsy onValidSubmit={this.register} onValid={()=>this.toggleButton(true)} onInvalid={()=>this.toggleButton(false)} >
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
                </Formsy>
            </div>
        )
    }
}