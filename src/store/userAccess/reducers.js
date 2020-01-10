import {SET_AUTENTIFICATION, REDUCE_AUTENTIFICATION, REDUCE_LOADER} from './actions'

const intialState = {
  isAuthenticated : false,
  isloading: true,
}

export const isAuthenticatedReduser = (state = intialState, action) => {
  switch(action.type) {
    case SET_AUTENTIFICATION :
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case REDUCE_AUTENTIFICATION :
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case REDUCE_LOADER :
      return {
        ...state,
        isloading: action.payload
      }
    default : return state
  }
}
