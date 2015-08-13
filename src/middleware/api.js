import xhr from 'xhr';
import { getRequestHeaders } from '../util/helpers.js';

function request(url, successCallback, errorCallback) {

    xhr({
        url: url,
        json: true,
        headers: getRequestHeaders()
    }, function(err, response, body) {
        if(!err && response.statusCode < 400) {
            successCallback(body);
        } else {
            errorCallback(err || new Error(response.statusCode));
        }
    });
}

export const REQUEST_API = Symbol('API REQUEST');

export default store => dispatch => action => {

    const callAPI = action[REQUEST_API];

    if(typeof callAPI === 'undefined') {
        return dispatch(action);
    }

    const { url, type } = callAPI;

    dispatch({type: type});

    return request(url, payload => dispatch({
        type: type + '_SUCCESS',
        payload
    }), err => dispatch({
        type:  + '_ERROR',
        error: err.message
    }));
};
