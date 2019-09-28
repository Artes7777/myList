export const CHANGE_DATE = "CHANGE_DATE";
export const TODAY_TASKS = "TODAY_TASKS";
export const WEEK_TASKS = "CHANGE_DATE";
export const DAILY_TASKS = "DAILY_TASKS";
export const SET_CALENDAR = "SET_CALENDAR";

export const changeDateTasks = date => ({
  type: CHANGE_DATE,
  payload: date
});

export const showTodayTasks = () => ({
  type: TODAY_TASKS,
  payload: new Date()
});

export const showWeekTasks = () => ({
  type: WEEK_TASKS,
  payload: null
});

export const setDailyTasks = () => ({
  type: DAILY_TASKS,
  payload: "today"
});

export const setCalendarTasks = () => ({
  type: SET_CALENDAR,
  payload: "calendar"
});
