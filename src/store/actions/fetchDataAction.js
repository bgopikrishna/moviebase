import {
  DATA_FETCHED,
  TOGGLE_LOADING_INDICATOR,
  TOGGLE_ERROR_INDICATOR,
  API_KEY,
  API_BASE_URL
} from "../../constants";
import { doToggleIndicator } from "./indicatorAction";

export const doFetchData = (searchTerm, page = 1) => {
  return dispatch => {
    dispatch(doToggleIndicator(TOGGLE_LOADING_INDICATOR, true));
    fetch(
      `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`
    )
      .then(data => data.json())
      .then(data => {
        dispatch(doStoreFetchedData(data.results));
      })
      .then(() => {
        dispatch(doToggleIndicator(TOGGLE_LOADING_INDICATOR, false));
      })
      .catch(errorMsg => {
        dispatch(doToggleIndicator(TOGGLE_LOADING_INDICATOR, false));
        dispatch(
          doToggleIndicator(TOGGLE_ERROR_INDICATOR, true, errorMsg.message)
        );
      });
  };
};
export const doStoreFetchedData = data => ({ type: DATA_FETCHED, data });

// export const applyFetchData = (state, action) => {
//   return dispatch => {
//     fetch(
//       "https://api.themoviedb.org/3/search/movie?api_key=b9b12a6098ee7f12b0552911951806c1&query=fury&page=1"
//     ).then(data => dispatch(doStoreFetchedData(data)));
//   };
// };

export const applyStoreFetchedData = (state, action) => {
  const { dataFetched } = state;
  return {
    dataFetched: [...action.data]
  };
};
