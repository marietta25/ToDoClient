const INITIAL_STATE = {
    isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, isSignedIn: true };
        case 'LOG_OUT':
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};