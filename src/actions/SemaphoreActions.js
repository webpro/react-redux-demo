import xhr from 'xhr';
import { SEMAPHORES_REQUEST_SUCCESS, SEMAPHORE_HOVER, SEMAPHORE_LOCK, SEMAPHORE_STATE_SUBMIT_SUCCESS } from '../constants/ActionTypes.js';
import { getRequestHeaders } from '../util/helpers.js';

let attempts = 0;

export default {

    getSemaphores(shiftId) {

        return (dispatch, getState) => {

            let state = getState(),
                { selectedShiftId } = state.funFairShifts,
                url = `${FUNFAIR_CONFIG.API.current['semaphores']}/${selectedShiftId}`;

            xhr({
                url: url,
                json: true,
                headers: getRequestHeaders()
            }, function (err, response, body) {
                attempts = 0;
                dispatch({
                    type: SEMAPHORES_REQUEST_SUCCESS,
                    payload: {
                        semaphores: body.SEMAPHORES
                    }
                });
            });

        };

    },

    selectSemaphore(semaphoreId) {
        return {
            type: SEMAPHORE_HOVER,
            payload: {
                semaphoreId: semaphoreId
            }
        }
    },

    lockSemaphore(semaphoreId, requestState) {
        return {
            type: SEMAPHORE_LOCK,
            payload: {
                semaphoreId: semaphoreId,
                semaphoreState: requestState
            }
        }
    },

    save(data) {

        return dispatch => {

            let url = `${FUNFAIR_CONFIG.API.current['state']}/${data.SHIFT_ID}/${data.SEMAPHORE_ID}`;

            xhr({
                url: url,
                json: data,
                method: url.indexOf('stub') === -1 ? 'POST' : 'GET',
                headers: getRequestHeaders()
            }, function(err, resp, body) {
                dispatch({
                    type: SEMAPHORE_STATE_SUBMIT_SUCCESS,
                    payload: {
                        result: body
                    }
                });
            });
        }
    }
};
