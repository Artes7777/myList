import {SET_FILTER} from './actions';

const intialState = {
  filter : 'all'
}

export const filterReducer = (state = intialState, action ) => {
  switch(action.type) {
    case SET_FILTER :
      return {
        ...state,
        filter: action.payload
      }
    default : return state;  
  };
}
