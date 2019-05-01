import React from "react";
import { WatchListAddIcon } from "../MaterialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faHeartbeat
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const MovieActionBtns = ({
  rating,
  toggleModal,
  totalVotes,
  favIds,
  watchListIds,
  movieId,
  handleFavBtn,
  handleWatchListBtn,
  isTrailerAvailable
}) => {
  let isFav = favIds.includes(movieId); //Checking if the item is fav or not by passing id
  let isInWatchList = watchListIds.includes(movieId);

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
            <span className="movieinfo-action-btn-content">Trailer</span>
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    favIds: state.favItems.ids,
    watchListIds: state.watchListItems.ids
  };
};

export default connect(mapStateToProps)(MovieActionBtns);
