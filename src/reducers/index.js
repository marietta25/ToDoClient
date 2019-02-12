import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loaderReducer from './loaderReducer';

export const userReducer = (state = {}, action) => {    
    switch (action.type) {
        case 'FETCH_USER':
            return action.payload;
        case 'GET_USERINFO':
            return {...state, info: action.payload };
        case 'CREATE_USER':
            return action.payload;
        default:
            return state;
    }
};

export const tasksReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TASK':
            return { ...state, [action.payload.Id]: action.payload };
        case 'FETCH_TASKS':
            return { ...state, ..._.mapKeys(action.payload, 'Id')};
        case 'CREATE_TASK':
            return { ...state, [action.payload.Id]: action.payload };
        case 'UPDATE_TASK':
            return { ...state, [action.payload.Id]: action.payload };
        case 'DELETE_TASK':
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    tasks: tasksReducer,
    loader: loaderReducer,
    form: formReducer
});

export default (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = undefined;
    }
    return appReducer(state, action);
};