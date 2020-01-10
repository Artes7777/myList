import {SNACKBAR_ERROR}  from './actions';
import {OPEN_SNACKBAR}  from './actions';
import {CLOSE_SNACKBAR}  from './actions';

const intialState = {
  error: null,
  open: false
}

export const snackbarReduser = (state = intialState, action) => {
  switch(action.type) {
    case SNACKBAR_ERROR :
      return {
        ...state,
        error: action.payload
    };
    case OPEN_SNACKBAR :
      return {
        ...state,
        open: action.payload
    };
    case CLOSE_SNACKBAR :
      return {
        ...state,
        open: action.payload
    };
    default : return state
  }
}
