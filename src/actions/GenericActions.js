import { FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';

export default {
    setSelectedShift(shiftId) {
        return {
            type: FUNFAIRSHIFTS_SELECT,
            payload: {
                shiftId: shiftId
            }
        };
    }
}
