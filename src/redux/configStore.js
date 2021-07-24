import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allStore from './modules/allStore';

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  allStore,
});

const store = createStore(rootReducer, enhancer);

export default store;
