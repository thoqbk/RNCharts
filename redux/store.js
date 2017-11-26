import config from '../config/app.js';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import statsReducer from './reducer/stats.js';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  stats: statsReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
