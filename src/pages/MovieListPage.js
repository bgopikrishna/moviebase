import React from "react";
import { connect } from "react-redux";
import "./MovieListPage.scss";
import MovieListCard from "../components/movie/MovieListCard";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { doMarkFavourite } from "../store/actions/favouriteAction";
import { addToWatchList } from "../store/actions/watchListAction";
import { getFavlistAndWatchlistCollections } from "../helperfunctions/helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
          <TransitionGroup timeout={300}>
            {favlistCollection.length !== 0 ? (
              favlistCollection.map(movie => (
                <CSSTransition
                  classNames="list-item-fade"
                  timeout={500}
                  key={movie.id}
                >
                  <MovieListCard
                    movie={movie}
                    deleteListItem={() => deleteFromFavList(movie, movie.id)}
                  />
                </CSSTransition>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>Favourites list Empty</p>
            )}
          </TransitionGroup>
        </div>
      </div>

      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Your Watchlist</h3>
        </div>
        <div className="movie-list__list-items">
          <TransitionGroup>
            {watchlistCollection.length !== 0 ? (
              watchlistCollection.map(movie => (
                <CSSTransition
                  classNames="list-item-fade"
                  timeout={500}
                  key={`${movie.id} watch`}
                >
                  <MovieListCard
                    movie={movie}
                    deleteListItem={() => deleteFromWatchList(movie, movie.id)}
                  />
                </CSSTransition>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>Watchlist is Empty</p>
            )}
          </TransitionGroup>
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
