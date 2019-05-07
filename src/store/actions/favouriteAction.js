import { ADD_FAV_TO_LIST } from "../../constants";

export const doMarkFavourite = (movie, id) => {
  return diptach => diptach(doAddFavToList(movie, id));
};

export const doAddFavToList = (movie, id) => ({
  type: ADD_FAV_TO_LIST,
  movie,
  id
});

export const applyMarkFavourite = (state, action) => {
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
