import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUser, logIn, getUserInfo } from '../actions';
import Loader from './Loader';

class LoginForm extends React.Component {

    // Get user data on submitting form, set state isSignedIn to true
    onSubmit = async (formValues) => {
        await this.props.fetchUser(formValues);

        if (sessionStorage.isSignedIn === "true") {
            await this.props.getUserInfo();
            await this.props.logIn();
        }
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
                <input {...input} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    
    // Render login form
    render() {
        if (this.props.loader.loading) {
            return <Loader message="Logging in..." />;
        }
        return (
            <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="username" component={this.renderInput} label="Username" type="text" />
                <Field name="password" component={this.renderInput} label="Password" type="password" />
                <button className="ui button primary">Login</button>
            </form>
            </div>
        );
    }
}

// Prevent submitting login form without username and password
const validate = (formValues) => {
    const errors = {};

    if (!formValues.username) {
        errors.username = "Please enter username";
    }
    if (!formValues.password) {
        errors.password = "Please enter password";
    }
    return errors;
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, user: state.user, loader: state.loader };
};

const formWrapped = reduxForm({
    form: 'loginForm',
    validate: validate
})(LoginForm);

export default connect(mapStateToProps, { fetchUser, logIn, getUserInfo })(formWrapped);