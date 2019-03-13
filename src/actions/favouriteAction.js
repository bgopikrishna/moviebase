import { ADD_FAV_TO_LIST } from "../constants";

export const doMarkFavourite = id => {
  return diptach => diptach(doAddFavToList(id));
};

export const doAddFavToList = id => ({ type: ADD_FAV_TO_LIST, id });

export const applyMarkFavourite = (state, action) => {
  const { ids, list } = state;
  const isItFav = ids.includes(action.id);
  let newIds;

  if (isItFav) {
    newIds = ids.filter(id => id !== action.id);
  } else {
    newIds = [...ids, action.id];
  }

  return {
    ids: newIds
  };
};
