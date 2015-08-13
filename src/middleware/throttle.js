import { REQUEST_API } from './api';

let cache = {};

export default store => dispatch => action => {

    const requestAPI = action[REQUEST_API];

    if(typeof requestAPI === 'undefined') {
        return dispatch(action);
    }

    const { type, throttle } = requestAPI;

    if(typeof throttle === 'undefined') {
        return dispatch(action);
    }

    if(cache[type]) {
        dispatch({type: type + '_THROTTLED'});
    } else {
        cache[type] = true;
        setTimeout(() => delete cache[type], throttle);
        return dispatch(action);
    }
};
