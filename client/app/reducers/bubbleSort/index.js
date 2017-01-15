import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_BUBBLETWO = "SET_CURRENT_BUBBLETWO";
export const setCurrentBubbleTwo = createAction(SET_CURRENT_BUBBLETWO);

export const currentBubbleTwo = handleActions({
  SET_CURRENT_BUBBLETWO: (state, { payload }) => {
    return payload;
  },
}, initialState);
