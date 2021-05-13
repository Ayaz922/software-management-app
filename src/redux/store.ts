import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import {logger} from 'redux-logger'

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeEnhancer = composeEnhancer(applyMiddleware(thunk, logger));
const store = createStore(rootReducer,{},storeEnhancer);
export default store;