const INITIAL_STATE = {
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REQUEST_BEGIN':
            return { ...state, loading: true, error: null };
        case 'REQUEST_SUCCESS':
            return { ...state, loading: false };
        case 'REQUEST_FAILURE':
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
};