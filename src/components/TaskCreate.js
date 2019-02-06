import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions';
import TaskForm from './TaskForm';

class TaskCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createTask(formValues);
    }

    render() {
        if (this.props.isSignedIn) {
            return (
                <div>
                    <h3>Create Task</h3>
                    <TaskForm onSubmit={this.onSubmit} />
               </div>
            );
        }
        
        return null;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { createTask })(TaskCreate);
