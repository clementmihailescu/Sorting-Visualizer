import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_HEAPTHREE = "SET_CURRENT_HEAPTHREE";
export const setCurrentHeapThree = createAction(SET_CURRENT_HEAPTHREE);

export const currentHeapThree = handleActions({
  SET_CURRENT_HEAPTHREE: (state, { payload }) => {
    return payload;
  },
}, initialState);
