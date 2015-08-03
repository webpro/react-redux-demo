import { FUNFAIRSHIFTS_REQUEST_SUCCESS, FUNFAIRSHIFTS_SORT, FUNFAIRSHIFTS_SELECT } from '../constants/ActionTypes';
import find from 'lodash.find';

const initialState = {
    shifts: [],
    selectedShiftId: null
};

const actionsMap = {
    [FUNFAIRSHIFTS_REQUEST_SUCCESS]: (state, action) => ({shifts: sortBy(action.payload.shifts, action.payload.sortAttr)}),
    [FUNFAIRSHIFTS_SORT]: (state, action) => ({shifts: sortBy(action.payload.shifts, action.payload.sortAttr)}),
    [FUNFAIRSHIFTS_SELECT]: (state, action) => ({selectedShiftId: action.payload.shiftId})
};

function sortBy(shifts, attr) {

    if(!attr) return shifts;

    const sortAttribute = attr.replace(/^-/, '');
    const sortDirection = attr.indexOf('-') === 0 ? -1 : 1;

    return shifts.sort(function comparator(a, b) {

        a = a[sortAttribute];
        b = b[sortAttribute];

        if (a === b) return 0;

        if (sortDirection === 1) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }
    });
}

export default function shifts(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if(!reduceFn) return state;

    return {...state, ...reduceFn(state, action)};
}
