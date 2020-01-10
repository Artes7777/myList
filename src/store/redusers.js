import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {authReducer} from './Auth/redusers';
import {filterReducer} from './filter/reducers';
import {tasksReducer} from './app/reducers';
import {dateReducer} from './date/reducers';
import {singUpReduser} from './singup/redusers';
import {snackbarReduser} from './snackbar/redusers';
import {isAuthenticatedReduser} from './userAccess/reducers'

export default combineReducers  ({
  tasks : tasksReducer,
  auth: authReducer,
  signup: singUpReduser,
  filter: filterReducer,
  form: formReducer,
  date: dateReducer,
  snackbar: snackbarReduser,
  isAuthenticated: isAuthenticatedReduser,
})
