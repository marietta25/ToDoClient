import { toast } from 'react-toastify';
import todoApi from '../api/todoApi';
import history from '../history';
import { requestBegin, requestSuccess, requestFailure } from './loaderActions';

export const fetchUser = (formValues) => {
    let encodedCreds = "grant_type=password&username=" + encodeURIComponent(formValues.username) + "&password=" + encodeURIComponent(formValues.password);
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.post('/Account/Login', encodedCreds,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.data.access_token) {
                dispatch(requestSuccess());
                sessionStorage.setItem('jwtToken', response.data.access_token);
                sessionStorage.setItem('isSignedIn', true);
            }
            dispatch({ type: 'FETCH_USER', payload: response.data });
        }).catch((err) => {
            dispatch(requestFailure(err.response.data));
        });
    };
};

export const getUserInfo = () => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.get('/Account/UserInfo',
        {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            }
        }).then((response) => {
            dispatch(requestSuccess());
            sessionStorage.setItem('email', response.data.Email);
            sessionStorage.setItem('firstName', response.data.Firstname);
            sessionStorage.setItem('lastName', response.data.Lastname);
            dispatch({ type: 'GET_USERINFO', payload: response.data });
        }).catch((err) => {
            dispatch(requestFailure(err.response.data));
        });
    };
};

export const createUser = (formValues) => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.post('/Account/Register', {
            Firstname: formValues.firstname,
            Lastname: formValues.lastname,
            Email: formValues.username,
            Password: formValues.password,
            ConfirmPassword: formValues.passwordConfirm
        }).then((response) => {
            dispatch(requestSuccess());
            dispatch({ type: 'CREATE_USER', payload: response.data });
            toast.success("Profile created! You can now log in!")
            history.push('/login');
        }).catch((err) => {
            dispatch(requestFailure(err.response.data));
        });
    };
};

export const logIn = (token) => {
    return {
        type: 'LOG_IN',
        payload: token
    };
};

export const logOut = () => {
    sessionStorage.setItem('jwtToken', null);
    sessionStorage.setItem('isSignedIn', false);
    sessionStorage.setItem('email', null);
    sessionStorage.setItem('firstName', null);
    sessionStorage.setItem('lastName', null);
    history.push('/');
    return {
        type: 'LOG_OUT'
    };
};

export const fetchTask = (id) => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.get(`/Tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            },
            
        }).then((response) => {
            dispatch(requestSuccess());
            dispatch({ type: 'FETCH_TASK', payload: response.data });
        }).catch((err) => {
            dispatch(requestFailure(err));
        });
    };
};

export const fetchTasks = () => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.get('/Tasks?sort=-Id', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            } 
        }).then((response) => {
            dispatch(requestSuccess());
            dispatch({ type: 'FETCH_TASKS', payload: response.data });
        }).catch((err) => {
            dispatch(requestFailure(err));
        });
    };
};

export const createTask = (formValues) => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.post('/Tasks', {
            Id: null,
            Title: formValues.Title,
            Desc: formValues.Desc,
            MarkedAsDone: false,
            CreatedAt: new Date().toJSON()
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            }
        }).then((response) => {
            dispatch(requestSuccess());
            dispatch({ type: 'CREATE_TASK', payload: response.data});
            toast.success('New task added to list!');
            history.push('/tasks');
        }).catch((err) => {
            dispatch(requestFailure(err));
        });
    }
};

export const updateTask = (id, formValues) => {
    return async function(dispatch) {
        dispatch(requestBegin());
        return await todoApi.put(`/Tasks/${id}`, formValues, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            }
        }).then((response) => {
            dispatch(requestSuccess());
            dispatch({ type: 'UPDATE_TASK', payload: response.data});
            history.push('/tasks');
        }).catch((err) => {
            dispatch(requestFailure(err));
        });        
    }
};

export const deleteTask = (id) => {
    return async dispatch => {
        dispatch(requestBegin());
        return await todoApi.delete(`/Tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.jwtToken}`
            }
        }).then(() => {
            dispatch(requestSuccess());
            dispatch({ type: 'DELETE_TASK', payload: id});
            toast.success('Task was deleted!');
            history.push('/tasks'); 
        }).catch((err) => {
            dispatch(requestFailure(err.response.data));
        });
    }
};