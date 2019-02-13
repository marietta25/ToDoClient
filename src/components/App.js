import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TaskList from './tasks/TaskList';
import TaskCreate from './tasks/TaskCreate';
import TaskItem from './tasks/TaskItem';
import TaskDelete from './tasks/TaskDelete';
import Header from './Header';
import TaskUpdate from './tasks/TaskUpdate';
import history from '../history';
import { PrivateRoute } from './PrivateRoute';


class App extends React.Component {
    renderContent() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/register" exact component={RegisterForm} />
                    <PrivateRoute path="/tasks" exact component={TaskList} />
                    <PrivateRoute path="/tasks/new" exact component={TaskCreate} />
                    <PrivateRoute path="/tasks/view/:id" exact component={TaskItem} />
                    <PrivateRoute path="/tasks/update/:id" exact component={TaskUpdate} />
                    <PrivateRoute path="/tasks/delete/:id" exact component={TaskDelete} />
                </Switch>
            </div>
        );
    }

    render() {
        return (
            <div className="ui container">
                <ToastContainer autoClose={3000} />
                <Router history={history}>
                    <div>{this.renderContent()}</div>
                </Router>
            </div>
        );
    }
}

export default App;