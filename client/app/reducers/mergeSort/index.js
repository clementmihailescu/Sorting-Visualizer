import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_MERGEX = "SET_CURRENT_MERGEX";
export const setCurrentMergeX = createAction(SET_CURRENT_MERGEX);

export const currentMergeX = handleActions({
  SET_CURRENT_MERGEX: (state, { payload }) => {
    return payload;
  },
}, initialState);
