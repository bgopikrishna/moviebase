import { ADD_FAV_TO_LIST } from "../constants";

export const doMarkFavourite = id => {
  return diptach => diptach(doAddFavToList(id));
};

export const doAddFavToList = id => ({ type: ADD_FAV_TO_LIST, id });

export const applyMarkFavourite = (state, action) => {
  const { ids } = state;
  console.log(state, action);
  const newId = action.id;
  const newIds = [...ids, newId];
  console.log(newIds);
  return {
    ids: newIds
  };
};
