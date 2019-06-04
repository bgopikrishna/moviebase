//Watchlist

import { ADD_TO_WATCH_LIST } from "../../constants";

export const addToWatchList = (movie, id) => {
  
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

          return { ...watchlist, [id]: movieDetails };
        } else {

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

