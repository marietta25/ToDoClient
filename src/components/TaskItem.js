import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import history from '../history';
import { fetchTask } from '../actions';


class TaskItem extends React.Component {
    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
    }

    // Modal actions
    renderActions() {
        return (
            <React.Fragment>
                <Link to="/tasks" className="ui button">OK</Link>
            </React.Fragment>
        )
    }

    // Modal contents
    renderContent() {
        if (!this.props.task) {
            return 'Loading...'
        }
        return (
            <div>
                Title: {this.props.task.Title}
                <br></br>
                Description: {this.props.task.Desc}
            </div>
            
        );
    }
    
    // Use modal for viewing task title/description
    render() {
        return (
            <div>
                <Modal 
                    title="Task Contents"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/tasks')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { task: state.tasks[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchTask })(TaskItem);