import React from "react";
import { connect } from "react-redux";
import { getFavouritesList, getWatchList } from "../selectors";
import MovieCard from "../components/movie/MovieCard";
import "./MovieListPage.scss";

const MovieListPage = ({ favList, watchList }) => {
  return (
    <div className="movie-list-page">
      <div className="movie-list">
        <div className="movie-list__heading">
          <h3>Favourites</h3>
        </div>
        <ul className="movie-list__list-items">
          {favList.length !== 0 &&
            favList.map(movie => (
              <li key={movie.id} className="movie-list__list-item">
                <div className="list-item__title">
                  <h5>{movie.original_title}</h5>
                </div>
                <div className="list-item__date">
                  <p>{movie.release_date}</p>
                </div>
                <div className="list-item__rating">
                  <p>{movie.vote_average}</p>
                </div>
                <div className="list-item__delete">
                  <a href="/"> &times; </a>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="movie-list">
        <div className="list__heading">
          <h3>Watch List</h3>
        </div>
        <div className="list-items">
          {watchList.length !== 0 &&
            watchList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    favList: getFavouritesList(state),
    watchList: getWatchList(state)
  };
};

export default connect(mapStateToProps)(MovieListPage);
