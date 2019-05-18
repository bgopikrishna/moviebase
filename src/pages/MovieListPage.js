import React from "react";
import { connect } from "react-redux";
import { getFavouritesList, getWatchList } from "../selectors";
import "./MovieListPage.scss";
import MovieListCard from "../components/movie/MovieListCard";
import { Redirect } from "react-router-dom";

const MovieListPage = ({ favList, watchList, auth }) => {
  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div className="movie-list-page">
      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Favourites</h3>
        </div>
        <div className="movie-list__list-items">
          {favList.length !== 0 &&
            favList.map(movie => (
              <MovieListCard
                key={movie.id}
                movie={movie}
                deleteType={"favList"}
              />
            ))}
        </div>
      </div>

      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Watch List</h3>
        </div>
        <div className="movie-list__list-items">
          {watchList.length !== 0 &&
            watchList.map(movie => (
              <MovieListCard
                key={movie.id}
                movie={movie}
                deleteType={"watchList"}
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
    favList: getFavouritesList(state),
    watchList: getWatchList(state),
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(MovieListPage);
