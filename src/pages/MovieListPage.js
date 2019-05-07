import React from "react";
import { connect } from "react-redux";
import { getFavouritesList, getWatchList } from "../selectors";
import MovieCard from "../components/movie/MovieCard";
import "./MovieListPage.scss";

const MovieListPage = ({ favList, watchList }) => {
  return (
    <React.Fragment>
      <div className="list">
        <div className="list__heading">
          <h3>Favourites</h3>
        </div>
        <div className="list-items">
          {favList.length !== 0 &&
            favList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>

      <div className="list">
        <div className="list__heading">
          <h3>Watch List</h3>
        </div>
        <div className="list-items">
          {watchList.length !== 0 &&
            watchList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </React.Fragment>
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
