import { REQUEST_API } from '../middleware/api';
import { SEMAPHORES_REQUEST, SEMAPHORE_HOVER, SEMAPHORE_LOCK, SEMAPHORE_STATE_SUBMIT } from '../constants/ActionTypes.js';

function fetchSemaphores(getState) {

    let state = getState(),
        { selectedShiftId } = state.funFairShifts;

    return {
        [REQUEST_API]: {
            url: `${FUNFAIR_CONFIG.API.current['semaphores']}/${selectedShiftId}`,
            type: SEMAPHORES_REQUEST
        }
    }
}

function storeSemaphoreState(data) {

    let url = `${FUNFAIR_CONFIG.API.current['state']}/${data.SHIFT_ID}/${data.SEMAPHORE_ID}`;

    return {
        [REQUEST_API]: {
            url: url,
            method: url.indexOf('stub') === -1 ? 'POST' : 'GET',
            type: SEMAPHORE_STATE_SUBMIT
        }
    }
}

export default {

    loadSemaphores() {
        return (dispatch, getState) => {
            return dispatch(fetchSemaphores(getState));
        };
    },

    selectSemaphore(semaphoreId) {
        return {
            type: SEMAPHORE_HOVER,
            payload: {
                semaphoreId: semaphoreId
            }
        };
    },

    lockSemaphore(semaphoreId, requestState) {
        return {
            type: SEMAPHORE_LOCK,
            payload: {
                semaphoreId: semaphoreId,
                semaphoreState: requestState
            }
        };
    },

    saveSemaphoreState(data) {
        return dispatch => {
            return dispatch(storeSemaphoreState(data));
        };
    }
};
