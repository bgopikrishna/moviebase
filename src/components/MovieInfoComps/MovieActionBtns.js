import React from "react";
import { WatchListAddIcon } from "../extras/MaterialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faHeartbeat
} from "@fortawesome/free-solid-svg-icons";


const MovieActionBtns = ({
  rating,
  toggleModal,
  totalVotes,
  favlistIds,
  watchlistIds,
  movieId,
  handleFavBtn,
  handleWatchListBtn,
  isTrailerAvailable
}) => {
  let isFav = favlistIds.includes(movieId); //Checking if the item is fav or not by passing id
  let isInWatchList = watchlistIds.includes(movieId);

  const likebtnStyle = isFav ? " active" : ""; //If the item is fav apply this class
  const watchListbtnStyle = isInWatchList ? "active" : "";

  return (
    <div className="movie-actions">
      <div className="user-score">
        <FontAwesomeIcon icon={faHeartbeat}> </FontAwesomeIcon>
        {` ${parseFloat(rating) * 10}%`}
        <span>{`${totalVotes} votes`}</span>
      </div>
      <div className="movieinfo-action-btns-grp">
        <button
          onClick={handleWatchListBtn}
          className={"movieinfo-action-btn watchlist " + watchListbtnStyle}
        >
          <WatchListAddIcon added={isInWatchList ? true : false} />
          <span className="movieinfo-action-btn-content">
            {isInWatchList ? "Watchlisted" : "Watchlist"}
          </span>
        </button>
        <button
          onClick={handleFavBtn}
          className={"movieinfo-action-btn like " + likebtnStyle}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className="movieinfo-action-btn-content">
            {isFav ? "Liked" : "Like"}
          </span>
        </button>
        {isTrailerAvailable && (
          <button
            onClick={toggleModal}
            className="movieinfo-action-btn play-trailer"
          >
            <FontAwesomeIcon icon={faPlay} />
            <span className="movieinfo-action-btn-content">Watch Trailer</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieActionBtns;
