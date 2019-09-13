import {SET_EMAIL_TEXT} from './actions';
import {SET_PASSWORD_TEXT} from './actions';

const intialState = {
  email : "",
  errMail : null,
  pass : "",
  errPass : null,
  error: null,
  open: false,
  emailVerified : false
}

export const authReducer = (state = intialState, action) => {
  switch(action.type) {
    case SET_EMAIL_TEXT :
      return {
        ...state,
        email: action.payload
      };
    case SET_PASSWORD_TEXT :
      return {
        ...state,
        pass: action.payload
      };

  }
  return state
}
