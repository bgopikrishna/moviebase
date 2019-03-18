import React from "react";
import { connect } from "react-redux";
import { getFavouritesList } from "../selectors";
import MovieCard from "../components/MovieCard";
import "./MovieListPage.scss";

const MovieListPage = ({ favList }) => {
  return (
    <div className="list">
      <div className="list__heading">
        <h3>Favourites</h3>
      </div>
      <div className="list-items">
        {favList.length !== 0 &&
          favList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    favList: getFavouritesList(state)
  };
};

export default connect(mapStateToProps)(MovieListPage);
