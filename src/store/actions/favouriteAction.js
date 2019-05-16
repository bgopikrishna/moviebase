import { ADD_FAV_TO_LIST } from "../../constants";

export const doMarkFavourite = (movie, id) => {
  return (disptach, getState, { getFirebase, getFirestore }) => {
    const { original_title, release_date, vote_average, poster_path } = movie;
    const movieDetails = {
      original_title,
      release_date,
      vote_average,
      poster_path
    };
    let favlist;
    const firestore = getFirestore();
    firestore
      .collection("data")
      .doc("wcSLYWcrGqQMzeoOeUPqlfLUIZo2")
      .get()
      .then(doc => {
        console.log(typeof doc.data());
        console.log(doc.data());

        favlist = doc.data().favlist;
        let isItAlreadyInList = favlist.hasOwnProperty(id);

        if (!isItAlreadyInList) {
          return { ...favlist, [id]: movieDetails };
        } else {
          delete favlist[id];

          return favlist;
        }
      })
      .then(data => {
        firestore
          .collection("data")
          .doc("wcSLYWcrGqQMzeoOeUPqlfLUIZo2")
          .update({
            favlist: data
          });
      });

    // disptach(doAddFavToList(movie, id));
  };
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
