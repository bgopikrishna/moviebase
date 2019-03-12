import { FETCH_DATA, DATA_FETCHED } from "../constants";

export const doFetchData = searchTerm => {
  return dispatch => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b9b12a6098ee7f12b0552911951806c1&query=${searchTerm}&page=1`
    )
      .then(data => data.json())
      .then(data => dispatch(doStoreFetchedData(data)));
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
