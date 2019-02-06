import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TaskList from './TaskList';
import TaskCreate from './TaskCreate';
import TaskItem from './TaskItem';
import TaskDelete from './TaskDelete';
import Auth from './Auth';
import TaskUpdate from './TaskUpdate';
import history from '../history';


class App extends React.Component {
    renderContent() {
        return (
            <div>
                <Auth />
                <Switch>
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/register" exact component={RegisterForm} />
                    <Route path="/tasks" exact component={TaskList} />
                    <Route path="/tasks/new" exact component={TaskCreate} />
                    <Route path="/tasks/view/:id" exact component={TaskItem} />
                    <Route path="/tasks/update/:id" exact component={TaskUpdate} />
                    <Route path="/tasks/delete/:id" exact component={TaskDelete} />
                </Switch>
            </div>
        );
    }

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>{this.renderContent()}</div>
                </Router>
            </div>
        );
    }
}

export default App;