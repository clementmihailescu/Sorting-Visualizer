import { createAction, handleActions } from "redux-actions";

const initialStateOne = [];
const initialStateTwo = null;

export const SET_CURRENT_QUICKTWO = "SET_CURRENT_QUICKTWO";
export const setCurrentQuickTwo = createAction(SET_CURRENT_QUICKTWO);
export const SET_PIVOT = "SET_PIVOT";
export const setPivot = createAction(SET_PIVOT);

export const currentQuickTwo = handleActions({
  SET_CURRENT_QUICKTWO: (state, { payload }) => {
    return payload;
  },
}, initialStateOne);
export const pivot = handleActions({
  SET_PIVOT: (state, { payload }) => {
    return payload;
  },
}, initialStateTwo);
