import { FUNFAIRSHIFTS_REQUEST_SUCCESS, FUNFAIRSHIFTS_SORT, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';
import sortByOrder from 'lodash.sortbyorder';


const initialState = {
    shifts: [],
    selectedShiftId: null
};

const actionsMap = {
    [FUNFAIRSHIFTS_REQUEST_SUCCESS]: (state, action) => ({shifts: sortBy(action.payload.shifts, action.payload.sortKey)}),
    [FUNFAIRSHIFTS_SORT]: (state, action) => ({shifts: sortBy(action.payload.shifts, action.payload.sortKey)}),
    [FUNFAIRSHIFTS_SELECT]: (state, action) => ({selectedShiftId: action.payload.shiftId})
};

const sortBy = (shifts, key) =>  {
    if(!key) return shifts;
    return sortByOrder(shifts, key.replace(/^-/, ''), key.indexOf('-') !== 0);
};

export default function shifts(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if(!reduceFn) return state;

    return {...state, ...reduceFn(state, action)};
}
