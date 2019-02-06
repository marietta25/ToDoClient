import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTask, updateTask } from '../actions';
import TaskForm from './TaskForm';

class TaskUpdate extends React.Component {
    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.updateTask(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.task) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Update Task</h3>
                <TaskForm initialValues={_.pick(this.props.task, 'Title', 'Desc')} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { task: state.tasks[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchTask, updateTask })(TaskUpdate);