import { ADD_FAV_TO_LIST } from "../../constants";

export const doMarkFavourite = (movie, id) => {
  return (disptach, getState, { getFirebase, getFirestore }) => {
    const { original_title, release_date, vote_average, poster_path ,id} = movie;
    const movieDetails = {
      original_title,
      release_date,
      vote_average,
      poster_path,
      id
    };
    const userId = getState().firebase.auth.uid;

    let favlist;
    const firestore = getFirestore();

    firestore
      .collection("data")
      .doc(userId)
      .get()
      .then(doc => {
        

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
          .doc(userId)
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

