export const requestBegin = () => ({
    type: 'REQUEST_BEGIN'
});

export const requestSuccess = () => ({
    type: 'REQUEST_SUCCESS'
});

export const requestFailure = (error) => ({
    type: 'REQUEST_FAILURE',
    payload: { error }
});