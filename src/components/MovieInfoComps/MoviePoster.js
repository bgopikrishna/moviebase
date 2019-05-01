import React from "react";
import "./MoviePoster.scss";
import { placeholderImage } from "../../helperfunctions/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const MoviePoster = ({
  backdrop,
  poster,
  altText,
  toggleModal,
  isTrailerAvailable
}) => {
  return (
    <div className="movie-cover-images">
      {isTrailerAvailable && (
        <button className="movie-cover-trailer-btn" onClick={toggleModal}>
          <FontAwesomeIcon
            icon={faPlayCircle}
            style={{ height: "100%", width: "100%" }}
          />
        </button>
      )}
      <img
        className="movie-backdrop"
        src={
          backdrop
            ? `https://image.tmdb.org/t/p/w1400_and_h450_face${backdrop}`
            : placeholderImage("No Poster Found", 1400, 450)
        }
        alt={altText}
      />
      <div className="movie-poster">
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`
              : placeholderImage("No Image Found", 120, 200)
          }
          alt={altText}
        />
      </div>
    </div>
  );
};

export default MoviePoster;
