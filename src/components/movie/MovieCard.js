import React from "react";
import "./MovieCard.scss";

import { Link } from "react-router-dom";
import { doMarkFavourite } from "../../store/actions/favouriteAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToWatchList } from "../../store/actions/watchListAction";
import { WatchListAddIcon } from "../extras/MaterialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { movieCardInfoParser } from "../../helperfunctions/movieInfoParser";

/*
 A moviecard component for diplaying movie details like rating , title etc
 Also for adding them to favourites and watchlist 
 */

const MovieCard = ({
  movie,
  addToFavList,
  addToWatchList,
  userId,
  favlistIds = [],
  watchlistIds = []
}) => {
  //Destructring data from the movie object
  let {
    id,
    vote_average,
    poster_path,
    original_title,
    overview,
    release_date
  } = movieCardInfoParser(movie);
  /**Checking  -ends */

  // }

  let isFav = favlistIds.includes(id); //Checking if the item is fav or not by passing id
  let isInWatchList = watchlistIds.includes(id);

  const likebtnStyle = isFav
    ? "action_btn__btn active"
    : "action_btn__btn liked"; //If the item is fav apply this class
  const watchListbtnStyle = isInWatchList
    ? "action_btn__btn active"
    : " action_btn__btn";

  if (userId) {
    return (
      //Movie card
      <div className="card">
        {/*Diplaying the Image-start */}
        <div className="card__image">
          <Link to={`/movie/${id}`}>
            <img src={poster_path} alt={original_title} />
          </Link>
        </div>
        {/*Diplaying the Image-End */}

        <div className="card__stacked">
          {/*Diplaying the Title, overview , date, rating - Start*/}

          <div className="card__content">
            <h3 className="card__title">
              <Link to={`/movie/${id}`}>{original_title}</Link>
            </h3>
            <span>{release_date}</span>
            <span className="card__rating">
              <FontAwesomeIcon icon={faStar} color="gold" /> {vote_average}
            </span>
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
                title="Add To WatchList"
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
  }

  return null;
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
    userId: state.firebase.auth.uid
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
  truncateText: true,
  favIds: [],
  watchListIds: []
};
