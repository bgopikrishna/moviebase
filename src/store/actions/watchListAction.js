import { ADD_TO_WATCH_LIST } from "../../constants";

export const addToWatchList = (movie, id) => {
  return diptach => diptach(doAddToWatchList(movie, id));
};

export const doAddToWatchList = (movie, id) => ({
  type: ADD_TO_WATCH_LIST,
  movie,
  id
});

export const applyAddToWatchList = (state, action) => {
  const { ids, list } = state;
  const isItFav = ids.includes(action.id);
  let newIds;
  let newList;

  if (isItFav) {
    newIds = ids.filter(id => id !== action.id);
    newList = list.filter(movie => movie.id !== action.id);
  } else {
    newIds = [...ids, action.id];
    newList = [...list, action.movie];
  }

  return {
    ...state,
    ids: newIds,
    list: newList
  };
};
