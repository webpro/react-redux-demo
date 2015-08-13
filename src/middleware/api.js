import 'whatwg-fetch';
import { getRequestHeaders } from '../util/helpers.js';

function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function request(url, { method, data }, successCallback, errorCallback) {

    fetch(url, {
        method: method || 'GET',
        headers: getRequestHeaders(),
        body: data ? JSON.stringify(data) : undefined
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(successCallback)
        .catch(errorCallback);
}

export const REQUEST_API = Symbol('API REQUEST');

export default store => dispatch => action => {

    const requestAPI = action[REQUEST_API];

    if(typeof requestAPI === 'undefined') {
        return dispatch(action);
    }

    const { url, type, method, data } = requestAPI;

    dispatch({type: type});

    return request(url, {method, data}, payload => dispatch({
        type: type + '_SUCCESS',
        payload
    }), err => dispatch({
        type: type + '_ERROR',
        error: err.message || 'Unknown',
        status: (err.response && err.response.status) || 0
    }));
};
