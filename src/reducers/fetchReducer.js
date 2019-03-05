import { FETCH_DATA, DATA_FETCHED } from "../constants";
import {
  applyFetchData,
  applyStoreFetchedData
} from "../actions/fetchDataAction";

export const fetchReducer = (state = {}, action) => {
  switch (action.type) {
    // case FETCH_DATA: {
    //   return applyFetchData(state, action);
    // }
    case DATA_FETCHED: {
      return applyStoreFetchedData(state, action);
    }
    default:
      return state;
  }
};
