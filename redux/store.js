import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

// const reducer = combineReducers({rootReducer});

// Redux: Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)); //, createLogger()

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

export default store;
