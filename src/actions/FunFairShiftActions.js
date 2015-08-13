import { REQUEST_API } from '../middleware/api';
import { FUNFAIRSHIFTS_REQUEST, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';

function fetchShifts() {
    return {
        [REQUEST_API]: {
            url: FUNFAIR_CONFIG.API.current['shifts'],
            type: FUNFAIRSHIFTS_REQUEST
        }
    }
}

export function loadShifts() {
    return dispatch => {
        return dispatch(fetchShifts());
    };
}
