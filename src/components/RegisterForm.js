import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser, logIn } from '../actions';
import history from '../history';

class RegisterForm extends React.Component {
    
    // Get user data on submitting the form
    onSubmit = async (formValues) => {
        await this.props.createUser(formValues);
        history.push('/login');
    }

    renderError ({ error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, type, meta}) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type={type} />
                {this.renderError(meta)}
            </div>
        );
    }
    
    // Render register form
    render() {
        return (
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="firstname" component={this.renderInput} label="First name" type="text" />
                <Field name="lastname" component={this.renderInput} label="Last name" type="text" />
                <Field name="username" component={this.renderInput} label="Username" type="text" />
                <Field name="password" component={this.renderInput} label="Password" type="password" />
                <Field name="passwordConfirm" component={this.renderInput} label="Confirm Password" type="password" />
                <button className="ui button primary">Register</button>
            </form>
            </div>
        );
    }
}

// Prevent submitting new user without first name, last name, username and password
const validate = (formValues) => {
    const errors = {};

    if (!formValues.firstname) {
        errors.firstname = "Please enter your first name";
    }
    if (!formValues.lastname) {
        errors.lastname = "Please enter your last name";
    }
    if (!formValues.username) {
        errors.username = "Please enter username";
    }
    if (!formValues.password) {
        errors.password = "Please enter password";
    }
    if (!formValues.passwordConfirm) {
        errors.passwordConfirm = "Please enter password";
    }
    return errors;
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

const formWrapped = reduxForm({
    form: 'registerForm',
    validate: validate
})(RegisterForm);

export default connect(mapStateToProps, { createUser, logIn })(formWrapped);