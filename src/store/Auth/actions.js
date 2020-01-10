export const SET_EMAIL_TEXT = "SET_EMAIL_TEXT";
export const SET_PASSWORD_TEXT = "SET_PASSWORD_TEXT";
export const DEL_ERROR_EMAIL = "DEL_ERROR_EMAIL";
export const SET_ERROR_EMAIL = "SET_ERROR_EMAIL";
export const DEL_ERROR_PASS = "DEL_ERROR_PASS";
export const SET_ERROR_PASS = "SET_ERROR_PASS";


export const  setEmailText = email => ({
  type : SET_EMAIL_TEXT,
  payload : email
});

export const  setPasswordText = pass => ({
  type : SET_PASSWORD_TEXT,
  payload : pass
});

export const delErrEmail = () => ({
  type : DEL_ERROR_EMAIL,
  payload : null
});

export const setErrEmail = err => ({
  type : SET_ERROR_EMAIL,
  payload : err
});

export const delErrPass = () => ({
  type : DEL_ERROR_PASS,
  payload : null
});

export const setErrPass = err => ({
  type : SET_ERROR_PASS,
  payload : err
});
