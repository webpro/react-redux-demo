let cache = {};

export default store => dispatch => action => {

    if (!action.type || !action.meta || !action.meta.throttle) {
        return dispatch(action);
    }

    const { type, meta } = action;

    if(cache[type]) {
        dispatch({type: type + '_THROTTLED'});
    } else {
        cache[type] = true;
        setTimeout(() => delete cache[type], meta.throttle);
        return dispatch(action);
    }
};
