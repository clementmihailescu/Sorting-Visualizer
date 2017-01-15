import { createAction, handleActions } from "redux-actions";

const initialState = "";

export const SET_ALGORITHM = "SET_ALGORITHM";
export const setAlgorithm = createAction(SET_ALGORITHM);

export const algorithm = handleActions({
  SET_ALGORITHM: (state, { payload }) => {
    return payload;
  },
}, initialState);
