import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions';
import TaskForm from './TaskForm';
import Loader from '../Loader';

class TaskCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createTask(formValues);
    }

    render() {
        if (this.props.loader.loading) {
            return <Loader message="Creating new task..." />;
        }
        return (
            <div>
                <h3>Create Task</h3>
                <TaskForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { loader: state.loader };
};

export default connect(mapStateToProps, { createTask })(TaskCreate);