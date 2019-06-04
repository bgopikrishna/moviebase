import { DATA_FETCHED } from "../../constants";
import { applyStoreFetchedData } from "../actions/fetchDataAction";
const INTIAL_STATE = {
  dataFetched: []
};

export const fetchReducer = (state = INTIAL_STATE, action) => {
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
