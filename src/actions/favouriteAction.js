import { ADD_FAV_TO_LIST } from "../constants";

export const doMarkFavourite = (movie, id) => {
  return diptach => diptach(doAddFavToList(movie, id));
};

export const doAddFavToList = (movie, id) => ({
  type: ADD_FAV_TO_LIST,
  movie,
  id
});

export const applyMarkFavourite = (state, action) => {
  console.log(action);
  const { ids } = state;
  let newIds;

  //checking if id already exists in the fav list
  const isIDExists =
    ids.filter(id => id === action.id).length !== 0 ? true : false;
  if (isIDExists) {
    //If id exists remove from list
    newIds = ids.filter(id => id !== action.id);
  } else {
    newIds = [...ids, action.id];
  }

  console.log(newIds);

  return {
    ids: newIds
  };
};
