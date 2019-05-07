import { TOGGLE_LOADING_INDICATOR, TOGGLE_ERROR_INDICATOR } from  '../../constants';
import {
  applyLoadingIndicator,
  applyErrorIndicator
} from "../actions/indicatorAction";

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMsg: ""
};

export const indicatorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_INDICATOR: {
      return applyLoadingIndicator(state, action);
    }
    case TOGGLE_ERROR_INDICATOR: {
      return applyErrorIndicator(state, action);
    }
    default:
      return state;
  }
};
