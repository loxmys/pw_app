import React from 'react';
import {userService} from "../../../data.manager";
import {branch} from "baobab-react/higher-order";
import {withFormsy} from "formsy-react";
@branch({
    userList: ['userList']
})
export class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            user: '',
            isSelectedUser: false,
        };
        if (this.props.defaultValue){
            this.setState({value: this.props.defaultValue});
        }
        this.findUser = this.findUser.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    findUser(event) {
        this.props.setValue(event.currentTarget.value);
        this.setState({value: event.target.value});
        if ( event.target.value !== ''){
            userService.filteredUserList(event.target.value);
            this.setState({isSelectedUser: false,});
        }
    }

    onFocus(){
        this.setState({focus: true});
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.focus){
                this.setState({
                    focus: false
                });
                if(!this.state.isSelectedUser){
                    this.setState({value: '',});
                    this.props.setValue('');
                }
            }
        }
    }
    onClick(selectedUser){
        this.props.setValue(selectedUser.name);
        this.setState({
            value: selectedUser.name,
            user: selectedUser,
            focus: false,
            isSelectedUser: true
        });
        this.props.onUserSelect(this.state);
    }

    render() {
        const { type, placeholder } = this.props;
        const error = this.props.getErrorMessage()
            || (!this.state.isSelectedUser && 'Select a name from the list' )
            || (this.props.isRequired() && !this.props.hasValue() && 'Required field') ||'';
        const valid = this.props.isValid();
        const pristine = this.props.isPristine();
        const submitted = this.props.isFormSubmitted();
        const touched = !pristine || submitted;
        const inputClass = !valid && touched && !this.state.isSelectedUser ? 'is-invalid' : (valid && touched && this.state.isSelectedUser ? 'is-valid' : '');
        return (
            <div ref={this.setWrapperRef} className={['dropdown w-100 form-group',
                // this.state.error ? 'has-error': '',
                !valid && touched && !this.state.isSelectedUser ? 'has-error' : '',
                this.state.focus ? 'show' : ''].join(' ')}>
                <input
                    className={["form-control w-100 ",
                    inputClass].join(' ')}
                    onFocus={this.onFocus}
                    value={this.state.value}
                    onChange={this.findUser}
                    placeholder={placeholder} type={type} />
                <small className="error-message">{error}</small>
                <div className={['dropdown-menu w-100', this.state.focus ? 'show ' : ''].join(' ')} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Enter the letter to search</a>
                    {this.props.userList && this.props.userList.map(user=><a onClick={() =>  {this.onClick(user)}} key={user.id} className="dropdown-item" href="#">{user.name}</a>)}
                </div>
            </div>
        )
    }
}
export default withFormsy(UserSearch);