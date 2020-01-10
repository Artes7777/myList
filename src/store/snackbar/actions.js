export const SNACKBAR_ERROR = "SNACKBAR_ERROR";
export const OPEN_SNACKBAR = "TOGGLE_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const setSnackbarErr = err => ({
  type : SNACKBAR_ERROR,
  payload : err
});

export const setSnackbarOpen = () => ({
  type : OPEN_SNACKBAR,
  payload : true
});

export const setSnackbarClose = () => ({
  type : CLOSE_SNACKBAR,
  payload : false
});
