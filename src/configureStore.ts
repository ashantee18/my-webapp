import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules";
import { rootSaga } from "./sagas";

import { composeWithDevTools } from 'redux-devtools-extension';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
// Mount it on the Store
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
    );

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;