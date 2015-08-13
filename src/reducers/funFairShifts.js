import { FUNFAIRSHIFTS_REQUEST, FUNFAIRSHIFTS_SORT, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
    shifts: [],
    selectedShiftId: null,
    sortKey: '-START'
};

const actionsMap = {
    [FUNFAIRSHIFTS_REQUEST + '_SUCCESS']: (state, action) => ({shifts: sortBy(action.payload.SHIFTS, state.sortKey)}),
    [FUNFAIRSHIFTS_SORT]: (state, action) => ({shifts: sortBy(state.shifts, action.payload.sortKey), sortKey: action.payload.sortKey}),
    [FUNFAIRSHIFTS_SELECT]: (state, action) => ({selectedShiftId: action.payload.shiftId})
};

const sortBy = (shifts, key) =>  {
    if(!key) return shifts;
    return _.sortByOrder(shifts, key.replace(/^-/, ''), key.indexOf('-') !== 0);
};

export default function shifts(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if(!reduceFn) return state;

    return {...state, ...reduceFn(state, action)};
}
