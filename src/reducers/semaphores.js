import { SEMAPHORES_REQUEST_SUCCESS, SEMAPHORE_HOVER, SEMAPHORE_LOCK, SEMAPHORE_STATE_SUBMIT_SUCCESS } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
    semaphores: {},
    hoveredSemaphoreId: 'entrance',
    lockedSemaphoreId: null,
    lockedSemaphoreState: null
};

const actionsMap = {
    [SEMAPHORES_REQUEST_SUCCESS]: (state, action) => ({semaphores: _.indexBy(action.payload.semaphores, 'ID')}),
    [SEMAPHORE_HOVER]: (state, action) => ({hoveredSemaphoreId: action.payload.semaphoreId}),
    [SEMAPHORE_LOCK]: (state, action) => ({lockedSemaphoreId: action.payload.semaphoreId, lockedSemaphoreState: action.payload.semaphoreState}),
    [SEMAPHORE_STATE_SUBMIT_SUCCESS]: (state, action) => ({lockedSemaphoreId: null, lockedSemaphoreState: null})
};

const getCurrentState = semaphore => {
    let state = find(semaphore.STATES, {CURRENT: 'Y'});
    if(state) {
        return state.STATE;
    }
    return null;
};

export default function semaphores(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if(!reduceFn) return state;

    return {...state, ...reduceFn(state, action)};
}

export { getCurrentState }
