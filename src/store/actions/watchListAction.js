//Watchlist

import { ADD_TO_WATCH_LIST } from "../../constants";

export const addToWatchList = (movie, id) => {
  console.log("action dispatching");
  
  return (disptach, getState, { getFirebase, getFirestore }) => {
    const {
      original_title,
      release_date,
      vote_average,
      poster_path,
      id
    } = movie;
    const movieDetails = {
      original_title,
      release_date,
      vote_average,
      poster_path,
      id
    };
    const userId = getState().firebase.auth.uid;

    let watchlist;
    const firestore = getFirestore();

    firestore
      .collection("data")
      .doc(userId)
      .get()
      .then(doc => {
        watchlist = doc.data().watchlist;
        let isItAlreadyInList = watchlist.hasOwnProperty(id);

        if (!isItAlreadyInList) {
          console.log("deleteing from list");

          return { ...watchlist, [id]: movieDetails };
        } else {
          console.log("deleteing from list");

          delete watchlist[id];

          return watchlist;
        }
      })
      .then(data => {
        firestore
          .collection("data")
          .doc(userId)
          .update({
            watchlist: data
          });
      });

    // disptach(doAddFavToList(movie, id));
  };
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
