import { ADD_TO_WATCH_LIST } from "../../constants";
import { applyAddToWatchList } from "../actions/watchListAction";

const INITIAL_STATE = {
  ids: [],
  list: []
};

export const watchListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_WATCH_LIST: {
      return applyAddToWatchList(state, action);
    }

    default:
      return state;
  }
};
