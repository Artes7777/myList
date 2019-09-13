import {combineReducers} from 'redux';
import {authReducer} from './Auth/redusers';
import {createStore} from 'redux';


export const store = createStore(authReducer);
