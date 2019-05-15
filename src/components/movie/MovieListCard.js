import React from "react";
import { connect } from "react-redux";
import "./MovieListCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { ifNotExists } from "../../helperfunctions/helpers";
import { Link } from "react-router-dom";
import { doMarkFavourite } from "../../store/actions/favouriteAction";
import { addToWatchList } from "../../store/actions/watchListAction";

const MovieListCard = ({
  movie,
  deleteType,
  removeFromFavList,
  removeFromWatchList
}) => {
  let { id, vote_average, poster_path, original_title, release_date } = movie;
  const handleBtn =
    deleteType === "favList" ? removeFromFavList : removeFromWatchList;

  poster_path = ifNotExists(
    poster_path,
    `https://image.tmdb.org/t/p/w185/${poster_path}`,
    "https://via.placeholder.com/200x120/000000/FFFFFF/?text=No Image"
  );

  original_title = ifNotExists(
    original_title,
    original_title.slice(0, 40),
    "No data"
  );
  release_date = ifNotExists(release_date, release_date, "-");
  vote_average = ifNotExists(vote_average, vote_average + "/10", "N/A");

  return (
    <div className="list-card">
      <div className="list-card__image">
        <img src={poster_path} alt={original_title} />
      </div>
      <div className="list-card__content">
        <div className="list-card__header">
          <h4>
            <Link to={`/movie/${id}`}>{original_title}</Link>
          </h4>
        </div>
        <div className="list-card__details">
          <span>
            <FontAwesomeIcon icon={faStar} color="gold" /> {vote_average}
          </span>
          <span>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; {release_date}
          </span>
        </div>
        <div className="list-card__action-bar">
          <button
            className="list-card__action-bar-btns"
            onClick={() => {
              handleBtn(movie, id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDisptachToProps = dispatch => {
  return {
    removeFromFavList: (movie, id) => dispatch(doMarkFavourite(movie, id)),
    removeFromWatchList: (movie, id) => dispatch(addToWatchList(movie, id))
  };
};

//Connecting  the redux central store to the component
const mapStateToProps = (state, props) => {
  //Syncing the data of favourites movies with store and dispalying for user if it's already liked
  return {
    ...props,
    favIds: state.favItems.ids,
    watchListIds: state.watchListItems.ids
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(MovieListCard);
