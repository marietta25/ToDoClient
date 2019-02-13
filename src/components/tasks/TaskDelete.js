import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchTask, deleteTask } from '../../actions';
import Loader from '../Loader';

class TaskDelete extends React.Component {
    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
    }

    // Modal actions
    renderActions() {
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteTask(this.props.match.params.id)} 
                    className="ui button negative">Delete
                </button>
                <Link to="/tasks" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    // Modal contents
    renderContent() {
        if (!this.props.task) {
            return 'Are you sure you want to delete this task?'
        }
        return `Are you sure you want to delete task: ${this.props.task.Title}`
    }
    
    // Render modal
    render() {
        if (this.props.loader.loading) {
            return <Loader message="Deleting task..." />;
        }
        return (
            <div>
                <Modal 
                    title="Delete task"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/tasks')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        task: state.tasks[ownProps.match.params.id],
        loader: state.loader
    }
};

export default connect(mapStateToProps, { fetchTask, deleteTask })(TaskDelete);