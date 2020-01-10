export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export const setOpenDialog = () => ({
  type : OPEN_DIALOG,
  payload : true
})

export const setCloseDialog = () => ({
  type : CLOSE_DIALOG,
  payload : false
})
