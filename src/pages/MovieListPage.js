import React from "react";
import { connect } from "react-redux";
import { getFavouritesList, getWatchList } from "../selectors";
import "./MovieListPage.scss";
import MovieListCard from "../components/movie/MovieListCard";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { doMarkFavourite } from "../store/actions/favouriteAction";
import { addToWatchList } from "../store/actions/watchListAction";
import { getFavlistAndWatchlistCollections } from "../helperfunctions/helpers";

const MovieListPage = ({
  deleteFromFavList,
  deleteFromWatchList,
  auth,
  firestoreData
}) => {
  if (!auth.uid) return <Redirect to="/signin" />;
  
  const {
    favlistCollection,
    watchlistCollection
  } = getFavlistAndWatchlistCollections(firestoreData, auth.uid);

  return (
    <div className="movie-list-page">
      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Your Favourites</h3>
        </div>
        <div className="movie-list__list-items">
          {favlistCollection.length !== 0 &&
            favlistCollection.map(movie => (
              <MovieListCard
                key={movie.id}
                movie={movie}
                deleteListItem={() => deleteFromFavList(movie, movie.id)}
              />
            ))}
        </div>
      </div>

      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Your Watchlist</h3>
        </div>
        <div className="movie-list__list-items">
          {watchlistCollection.length !== 0 &&
            watchlistCollection.map(movie => (
              <MovieListCard
                key={`${movie.id} watch`}
                movie={movie}
                deleteListItem={() => deleteFromWatchList(movie, movie.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth,
    firestoreData: state.firestore.data.data
  };
};

const mapDisptachToProps = dispatch => {
  return {
    deleteFromFavList: (movie, id) => dispatch(doMarkFavourite(movie, id)),
    deleteFromWatchList: (movie, id) => dispatch(addToWatchList(movie, id))
  };
};

const enhanceWithFirestore = compose(
  connect(
    mapStateToProps,
    mapDisptachToProps
  ),
  firestoreConnect(["data"]) // sync data collection from Firestore into redux
);

export default enhanceWithFirestore(MovieListPage);
