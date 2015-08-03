import { SEMAPHORES_REQUEST_SUCCESS, SEMAPHORE_HOVER, SEMAPHORE_LOCK, SEMAPHORE_STATE_SUBMIT_SUCCESS } from '../constants/ActionTypes';
import find from 'lodash.find';

const initialState = {
    semaphores: [],
    hoveredSemaphoreId: 'entrance',
    lockedSemaphoreId: null,
    lockedSemaphoreState: null
};

const actionsMap = {
    [SEMAPHORES_REQUEST_SUCCESS]: (state, action) => ({semaphores: parse(action.payload.semaphores)}),
    [SEMAPHORE_HOVER]: (state, action) => ({hoveredSemaphoreId: action.payload.semaphoreId}),
    [SEMAPHORE_LOCK]: (state, action) => ({lockedSemaphoreId: action.payload.semaphoreId, lockedSemaphoreState: action.payload.semaphoreState}),
    [SEMAPHORE_STATE_SUBMIT_SUCCESS]: (state, action) => ({lockedSemaphoreId: null, lockedSemaphoreState: null})
};

function parse(semaphores) {
    return semaphores.map(s => ({getCurrentState, getStates, ...s}));
}

function getCurrentState() {
    let state = find(this.STATES, {CURRENT: 'Y'});
    if(state) {
        return state.STATE;
    }
    return null;
}

function getStates() {
    return this.STATES;
}

export default function semahores(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if(!reduceFn) return state;

    return {...state, ...reduceFn(state, action)};
}
