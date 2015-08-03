import xhr from 'xhr';
import { FUNFAIRSHIFTS_REQUEST_SUCCESS, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';
import { getRequestHeaders } from '../util/helpers.js';

export default {

    getShifts(sortAttr) {

        return dispatch => {

            let url = FUNFAIR_CONFIG.API.current['shifts'];

            xhr({
                url: url,
                json: true,
                headers: getRequestHeaders()
            }, function(err, response, body) {
                dispatch({
                    type: FUNFAIRSHIFTS_REQUEST_SUCCESS,
                    payload: {
                        shifts: body.SHIFTS,
                        sortAttr: sortAttr
                    }
                });
            });
        }
    }
}
