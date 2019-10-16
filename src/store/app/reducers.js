import {SET_TASKS, SET_TASK, DELETE_TASK, UPDATE_TASK, DELETE_TASKS} from './actions'

const intialState = {
  tasks : [],
  selected : new Set(),
  isSelectedAll: false,
};

export const tasksReducer = (state = intialState, action) => {
  switch(action.type) {
    case SET_TASKS :
    return {
      ...state,
      tasks: action.payload
    }
    case SET_TASK :
    return {
      ...state,
      tasks: [
        ...state.tasks,
        action.payload
      ]
    }
    case DELETE_TASK :
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case UPDATE_TASK :
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload
      }
      return {
        ...state,
        tasks : [...state.tasks]
      }
    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(task => !action.payload.has(task.id))
      }
  }
  return state;
}
