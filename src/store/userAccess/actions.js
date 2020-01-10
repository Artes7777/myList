export const SET_AUTENTIFICATION = 'SET_AUTENTIFICATION';
export const REDUCE_AUTENTIFICATION = 'REDUCE_AUTENTIFICATION';
export const REDUCE_LOADER = 'REDUCE_LOADER';

export const setAutentification = () => ({
  type: SET_AUTENTIFICATION,
  payload: true
});

export const reduceAutentification = () => ({
  type: REDUCE_AUTENTIFICATION,
  payload: false
})

export const reduceLoader = () => ({
  type: REDUCE_LOADER,
  payload: false
})
