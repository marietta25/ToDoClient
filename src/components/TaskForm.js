import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class TaskForm extends React.Component {
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
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

    renderInput = ({ input, label, meta}) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type="text" />
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="Title" component={this.renderInput} label="Title" />
                <Field name="Desc" component={this.renderInput} label="Description" />
                <Link to={'/tasks'} className="ui button">Cancel</Link>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

// Prevent submitting task without a title
const validate = (formValues) => {
    const errors = {};

    if (!formValues.Title) {
        errors.Title = "Please enter task title";
    }
    return errors;
};

export default reduxForm({
    form: 'taskForm',
    validate: validate
})(TaskForm);
