import {CHANGE_DATE} from './actions';
import {TODAY_TASKS} from './actions';
import {WEEK_TASKS} from './actions';
import {DAILY_TASKS} from './actions';
import {SET_CALENDAR} from './actions';

const intialState = {
  date : new Date(),
  todayOrCalendar : null,
}

export const dateReducer = (state = intialState, action) => {
  switch(action.type) {
    case CHANGE_DATE :
      return {
        ...state,
        date: action.payload
      };
    case TODAY_TASKS :
      return {
        ...state,
        date: action.payload
      };
    case WEEK_TASKS :
      return {
        ...state,
        date: action.payload
      };
    case DAILY_TASKS :
      return {
        ...state,
        todayOrCalendar: action.payload
      };
    case SET_CALENDAR :
      return {
        ...state,
        todayOrCalendar: action.payload
      };
  }
  return state;
}
