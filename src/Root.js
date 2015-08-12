import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './reducers';
import FunFairShiftsApp from './container/FunFairShiftsApp';
import FunFairShifts from './components/FunFairShifts';
import Semaphores from './components/Semaphores';

let middleware = [thunk];
if(__DEV__) middleware.push(logger);

const createStoreWithMiddleware = applyMiddleware.apply(null, middleware)(createStore),
    reducer = combineReducers(reducers),
    store = createStoreWithMiddleware(reducer);

export default class Root extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render() {
        const { history } = this.props;
        return (
            <Provider store={store}>
                {renderRoutes.bind(null, history)}
            </Provider>
        );
    }
}

function renderRoutes(history) {
    return (
        <Router history={history}>
            <Route component={FunFairShiftsApp}>
                <Route name="shifts" path="shifts" component={FunFairShifts}></Route>
                <Route name="semaphores" path="semaphores/:SHIFT_ID" component={Semaphores}/>
            </Route>
            <Redirect from="/" to="/shifts" />
        </Router>
    );
}
