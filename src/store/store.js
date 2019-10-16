import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redusers';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));
