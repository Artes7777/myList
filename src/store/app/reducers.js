import {SET_TASKS, SET_TASK, DELETE_TASK, UPDATE_TASK, DELETE_TASKS,
SELECT_TASK, INPUT_CHECKED, DELETE_SELECTED, VALIDATE_CHECKBOX, MULTIPLY_SELECT} from './actions'

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
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    case DELETE_SELECTED :
      state.selected.delete(action.payload)
      return  {
        ...state,
        selected: new Set(Array.from(state.selected))
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
    case DELETE_TASKS :
      const filtredTasks = state.tasks.filter(task => !action.payload.has(task.id));
      return {
        ...state,
        tasks: [...filtredTasks]
      }
    case SELECT_TASK :
      if (action.payload.checked) {
        state.selected.add(action.payload.id)
      }
      else {state.selected.delete(action.payload.id)}
      return {
        ...state,
        selected: new Set(Array.from(state.selected)),
      }
      case MULTIPLY_SELECT:
        if (action.payload.status) {
          return {
            ...state,
            selected: new Set(Array.from(action.payload.selected))
          }
        }
      else {
        return {
          ...state,
          selected: new Set([])
        }
      }
      case INPUT_CHECKED :
        return {
          ...state,
          isSelectedAll: action.payload,
        }
      case VALIDATE_CHECKBOX :
        if (state.selected.size < 1) {
        return {
          ...state,
          isSelectedAll: action.payload,
        }
      }
      default : return state;
  }
}
