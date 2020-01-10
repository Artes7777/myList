import {OPEN_DIALOG, CLOSE_DIALOG}  from './actions';

const intialState = {
  openDialog: false,
}

export const singUpReduser = (state = intialState, action) => {
  switch(action.type) {
    case OPEN_DIALOG :
      return {
        ...state,
        openDialog: action.payload
    };
    case CLOSE_DIALOG :
      return {
        ...state,
        openDialog: action.payload
    };
    default : return state
  }
}
