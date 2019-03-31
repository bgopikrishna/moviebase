import React from "react";
import "./MovieCard.scss";
import { ifNotExists } from "../helperfunctions/helpers";
import { Link } from "react-router-dom";
import { doMarkFavourite } from "../actions/favouriteAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToWatchList } from "../actions/watchListAction";
import { WatchListAdd as WatchListAddIcon } from "./MaterialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

/*
 A moviecard component for diplaying movie details like rating , title etc
 Also for adding them to favourites and watchlist 
 */

const MovieCard = ({
  movie,
  addToFavList,
  addToWatchList,
  favIds,
  watchListIds,
  truncateText
}) => {
  //Destructring data from the movie object
  let {
    id,
    vote_average,
    poster_path,
    original_title,
    overview,
    release_date
  } = movie;

  /* ifNotExists is func whick checks if the info is available or not (from movie obj properties), 
  if not available replaces with respected message  */
  /**Checking  -starts */
  vote_average = ifNotExists(vote_average, vote_average + "/10", "N/A");
  poster_path = ifNotExists(
    poster_path,
    `https://image.tmdb.org/t/p/w185/${poster_path}`,
    "https://via.placeholder.com/200x120/000000/FFFFFF/?text=No Image"
  );
  overview = ifNotExists(overview, overview, "No Data");
  overview = truncateText ? overview.slice(0, 100) + "..." : overview;

  original_title = ifNotExists(
    original_title,
    original_title.slice(0, 40),
    "No data"
  );
  release_date = ifNotExists(release_date, release_date, "-");

  /**Checking  -ends */

  let isFav = favIds.includes(id); //Checking if the item is fav or not by passing id
  let isInWatchList = watchListIds.includes(id);

  const likebtnStyle = isFav
    ? "action_btn__btn active"
    : "action_btn__btn liked"; //If the item is fav apply this class
  const watchListbtnStyle = isInWatchList
    ? "action_btn__btn active"
    : " action_btn__btn";
  return (
    //Movie card
    <div className="card">
      {/*Diplaying the Image-start */}
      <div className="card__image">
        <img src={poster_path} alt={original_title} />
      </div>
      {/*Diplaying the Image-End */}

      <div className="card__stacked">
        {/*Diplaying the Title, overview , date, rating - Start*/}

        <div className="card__content">
          <h3 className="card__title">
            <Link to={`/movie/${id}`}>{original_title}</Link>
          </h3>
          <span>{release_date}</span>
          <span className="card__rating">{vote_average}</span>
          <p>{overview}</p>
        </div>

        {/*Diplaying the Title, overview , date, rating - End */}

        {/*Card actions like like and addToList buttons - Start */}
        <div className="card__action">
          {/*More info Link about Movie details */}
          <Link to={`/movie/${id}`}>More Info</Link>

          {/*Actions buttons */}
          <div className="action_btns">
            {/*Add to watchlist  with (bookmark symbol) Button */}
            <button
              className={watchListbtnStyle}
              onClick={() => addToWatchList(movie, id)}
            >
              <WatchListAddIcon
                added={isInWatchList}
                className={watchListbtnStyle}
              />
            </button>

            {/*Like Button with heart symbol */}
            <button
              onClick={() => addToFavList(movie, id)}
              className={likebtnStyle}
              title="Like"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
        {/*Card actions like like and addToList buttons - End */}
      </div>
    </div>
  );
};

//Connect the action creators and dispatching  to the component
const mapDisptachToProps = dispatch => {
  return {
    addToFavList: (movie, id) => dispatch(doMarkFavourite(movie, id)),
    addToWatchList: (movie, id) => dispatch(addToWatchList(movie, id))
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

//Connecting the Redux Store to the Component
export default connect(
  mapStateToProps,
  mapDisptachToProps
)(MovieCard);

//TypeChecking
MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  addToFavList: PropTypes.func,
  favIds: PropTypes.array
};

MovieCard.defaultProps = {
  truncateText: true
};
