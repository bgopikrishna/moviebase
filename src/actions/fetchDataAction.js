import {
  FETCH_DATA,
  DATA_FETCHED,
  TOGGLE_LOADING_INDICATOR,
  TOGGLE_ERROR_INDICATOR,
  API_KEY
} from "../constants";
import { doToggleIndicator } from "./indicatorAction";

export const doFetchData = searchTerm => {
  return dispatch => {
    dispatch(doToggleIndicator(TOGGLE_LOADING_INDICATOR, true));
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=1`
    )
      .then(data => data.json())
      .then(data => dispatch(doStoreFetchedData(data)))
      .then(() => {
        return setTimeout(
          () => dispatch(doToggleIndicator(TOGGLE_LOADING_INDICATOR, false)),
          2000
        );
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
  return action.data;
};
