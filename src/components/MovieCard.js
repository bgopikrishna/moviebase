import React from "react";
import "./MovieCard.scss";
import { ifNotExists } from "../helperfunctions/helpers";
import { Link } from "react-router-dom";
import { doMarkFavourite } from "../actions/favouriteAction";
import { connect } from "react-redux";

const MovieCard = ({ movie, onClick, favIds }) => {
  let {
    id,
    vote_average,
    poster_path,
    original_title,
    overview,
    release_date
  } = movie;

  vote_average = ifNotExists(vote_average, vote_average + "/10", "N/A");
  poster_path = ifNotExists(
    poster_path,
    `https://image.tmdb.org/t/p/w185/${poster_path}`,
    "https://via.placeholder.com/200x120/000000/FFFFFF/?text=No Image"
  );
  overview = ifNotExists(overview, overview.slice(0, 100) + "...", "No Data");
  original_title = ifNotExists(
    original_title,
    original_title.slice(0, 40),
    "No data"
  );
  release_date = ifNotExists(release_date, release_date, "-");
  let isFav = favIds.includes(id);

  let likebtnStyle = isFav ? { color: "red" } : { color: "inherit" };

  return (
    <div className="card">
      <div className="card__image">
        <img src={poster_path} alt="" />
      </div>
      <div className="card__stacked">
        <div className="card__content">
          <h3 className="card__title">{original_title}</h3>
          <span>{release_date}</span>
          <span className="card__rating">{vote_average}</span>
          <p>{overview}</p>
        </div>
        <div className="card__action">
          <Link to={`/movie/${id}`}>More Info</Link>
          <button onClick={() => onClick(id)} style={likebtnStyle} title="Like">
            <i className="fas fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDisptachToProps = dispatch => {
  return {
    onClick: (movie, id) => dispatch(doMarkFavourite(movie, id))
  };
};
const mapStateToProps = (state, props) => {
  return {
    ...props,
    favIds: state.favItems.ids
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(MovieCard);
