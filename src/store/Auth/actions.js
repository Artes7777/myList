export const SET_EMAIL_TEXT = "SET_EMAIL_TEXT";
export const SET_PASSWORD_TEXT = "SET_PASSWORD_TEXT";

export const  setEmailText = email => ({
  type : SET_EMAIL_TEXT,
  payload : email
});

export const  setPasswordText = password => ({
  type : SET_EMAIL_TEXT,
  payload : password
});
