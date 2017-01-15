import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_SORTED = "SET_CURRENT_SORTED";
export const setCurrentSorted = createAction(SET_CURRENT_SORTED);

export const currentSorted = handleActions({
  SET_CURRENT_SORTED: (state, { payload }) => {
    if (payload.length) {
      return state.concat(payload);
    } else {
      return [];
    }
  },
}, initialState);
