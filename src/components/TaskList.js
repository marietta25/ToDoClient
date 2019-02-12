import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks, updateTask } from '../actions';
import { Link } from 'react-router-dom';
import Loader from './Loader';

class TaskList extends React.Component {
    componentDidMount() {
        this.props.fetchTasks();
    }

    // Mark tasks done/undone, save it to database
    onChecked = (id) => {
        const taskChecked = this.props.tasks.find(el => {
            return el.Id === id;
        });
        if (taskChecked.MarkedAsDone === true) {
            taskChecked.MarkedAsDone = false;
        } else {
            taskChecked.MarkedAsDone = true;
        }
        const values = {
            Id: id,
            Title: taskChecked.Title,
            Desc: taskChecked.Desc,
            MarkedAsDone: taskChecked.MarkedAsDone
        };
        this.props.updateTask(id, values);
    }

    // Helper function to sort tasks on page from newer to older
    compare(a,b) {
        if (a.Id < b.Id)
          return 1;
        if (a.Id > b.Id)
          return -1;
        return 0;
      }

    // Render task list and buttons for viewing, editing, deleting
    renderList() {
        if (this.props.loader.loading) {
            return <Loader message="Getting your tasks..." />;
        }
        const sortedTasks = this.props.tasks.sort(this.compare);
        
        if (sortedTasks.length < 1) {
            return <div>You don't have any tasks yet.</div>;
        }

        return sortedTasks.map(task => {
            return (
                <div className="item" key={task.Id}>
                    <div className="content">
                        <div className="ui checkbox">
                            <input 
                                type="checkbox" 
                                name="example" 
                                checked={task.MarkedAsDone} 
                                onChange={()=>this.onChecked(task.Id)} />
                            
                            <label className="title">{task.Title}</label>
                            </div>
                        
                        <Link 
                            to={`/tasks/delete/${task.Id}`} 
                            className="ui icon button right floated" 
                            data-tooltip="Delete" >
                                <i className="trash alternate icon" />
                        </Link>
                        <Link 
                            to={`/tasks/update/${task.Id}`} 
                            className="ui icon button right floated"
                            data-tooltip="Edit" >
                                <i className="edit icon" />
                        </Link>
                        <Link 
                            to={`/tasks/view/${task.Id}`} 
                            className="ui icon button right floated"
                            data-tooltip="View" >
                                <i className="eye icon" />
                        </Link>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: 50 }}>
                    <Link to={"/tasks/new"} className="ui labeled icon button primary">
                        <i className="plus icon" />
                        CREATE NEW TASK
                    </Link>
                </div>
                <h2>Tasks

                </h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: Object.values(state.tasks), 
        task: state.task,
        loader: state.loader
    };
}

export default connect(mapStateToProps, { fetchTasks, updateTask })(TaskList);
