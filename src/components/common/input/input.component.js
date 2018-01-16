import React from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

class Input extends React.Component {

    static propTypes = {
        type: PropTypes.oneOf(['text', 'password', 'number', 'email']),
        placeholder: PropTypes.string,
        defaultValue: PropTypes.any,
    };

    static defaultProps = {
        type: 'text',
        placeholder: '',
    };

    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    render () {
        const { type, placeholder } = this.props;
        const error = this.props.getErrorMessage()
            || (this.props.isRequired() && !this.props.hasValue() && 'Required field') || '';
        const valid = this.props.isValid();
        const pristine = this.props.isPristine();
        const submitted = this.props.isFormSubmitted();
        const touched = !pristine || submitted;
        const inputClass = !valid && touched ? 'is-invalid' : (valid && touched ? 'is-valid' : '');
        return (
            <div className={`form-group ${!valid && touched ? 'has-error' : ''}`}>
                <input
                    defaultValue={this.props.defaultValue}
                       className={`form-control ${inputClass}`}
                       onChange={this.changeValue}
                        placeholder={placeholder}
                       type={type} />
                <small className="error-message">{error}</small>
            </div>
        );
    }
}

export default withFormsy(Input);