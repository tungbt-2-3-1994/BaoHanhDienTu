import {
    createStore,
    applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { createLogger } from 'redux-logger';

import reducers from '../reducers';

const reduxMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const reduxDevTools = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : {};

const middleWare = __DEV__
    ? applyMiddleware(thunk, createLogger(), reduxMiddleware)
    : applyMiddleware(thunk, reduxMiddleware);

const store = createStore(
    reducers,
    reduxDevTools,
    middleWare
);

export default store;