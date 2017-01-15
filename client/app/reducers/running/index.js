import { createAction, handleActions } from "redux-actions";

const initialState = false;

export const SET_RUNNING = "SET_RUNNING";
export const setRunning = createAction(SET_RUNNING);

export const isRunning = handleActions({
  SET_RUNNING: (state, { payload }) => {
    return payload;
  },
}, initialState);
