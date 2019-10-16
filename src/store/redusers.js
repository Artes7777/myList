import {combineReducers} from 'redux';
import {authReducer} from './Auth/redusers';
import {filterReducer} from './filter/reducers';
import {tasksReducer} from './app/reducers';
import {dateReducer} from './date/reducers';
import { reducer as formReducer } from 'redux-form';


export default combineReducers  ({
  tasks : tasksReducer,
  auth: authReducer,
  filter: filterReducer,
  form: formReducer,
  date: dateReducer
})
