import { createAction, createReducer } from 'redux-act';

// Initial State
const initialState = {
  authenticated: false,
  payload: null,
};

// Actions
export const saveAuth = createAction('store auth data');
export const deleteAuth = createAction('delete auth data');

// Reducers
export default createReducer(
  {
    [saveAuth]: (state, payload) => ({
      ...state,
      authenticated: true,
      payload,
    }),
    [deleteAuth]: state => ({
      ...state,
      authenticated: false,
      payload: null,
    }),
  },
  initialState,
);
