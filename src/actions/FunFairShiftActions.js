import { FUNFAIRSHIFTS_REQUEST, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';

function fetchShifts() {
    return {
        type: FUNFAIRSHIFTS_REQUEST,
        payload: {
            url: FUNFAIR_CONFIG.API.current['shifts']
        },
        meta: {
            throttle: 2000
        }
    }
}

export function loadShifts() {
    return dispatch => {
        return dispatch(fetchShifts());
    };
}
