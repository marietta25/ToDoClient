import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
    <Route
        {...rest}
        render = {props => 
            sessionStorage.getItem('jwtToken') !== 'null' ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            )
        }
    />
    );
};