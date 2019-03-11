import { ADD_FAV_TO_LIST } from "../constants";
import { applyMarkFavourite } from "../actions/favouriteAction";
const INITIAL_STATE = {
  ids: []
};

export const favouriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FAV_TO_LIST: {
      return applyMarkFavourite(state, action);
    }

    default:
      return state;
  }
};
