import {SET_EMAIL_TEXT} from './actions';
import {SET_PASSWORD_TEXT} from './actions';
import {DEL_ERROR_EMAIL}  from './actions';
import {SET_ERROR_EMAIL}  from './actions';
import {DEL_ERROR_PASS}  from './actions';
import {SET_ERROR_PASS}  from './actions';


const intialState = {
  email : "",
  errMail : null,
  pass : "",
  errPass : null,
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
      case DEL_ERROR_EMAIL :
        return {
          ...state,
          errMail: action.payload
        };
      case SET_ERROR_EMAIL :
        return {
          ...state,
          errMail: action.payload
      };
      case DEL_ERROR_PASS :
        return {
          ...state,
          errPass: action.payload
        };
      case SET_ERROR_PASS :
        return {
          ...state,
          errPass: action.payload
      };

      default : return state
  }
}
