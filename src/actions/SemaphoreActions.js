import { SEMAPHORES_REQUEST, SEMAPHORE_HOVER, SEMAPHORE_LOCK, SEMAPHORE_STATE_SUBMIT } from '../constants/ActionTypes.js';

function fetchSemaphores(getState) {

    let state = getState(),
        { selectedShiftId } = state.funFairShifts;

    return {
        type: SEMAPHORES_REQUEST,
        payload: {
            url: `${FUNFAIR_CONFIG.API.current['semaphores']}/${selectedShiftId}`
        },
        meta: {
            throttle: 2000
        }
    }
}

function storeSemaphoreState(data) {

    let url = `${FUNFAIR_CONFIG.API.current['state']}/${data.SHIFT_ID}/${data.SEMAPHORE_ID}`;

    return {
        type: SEMAPHORE_STATE_SUBMIT,
        payload: {
            url: url,
            method: url.indexOf('stub') === -1 ? 'POST' : 'GET',
            data: data
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
