import React from "react";
import "./MoviePoster.scss";

const MoviePoster = ({ backdrop, poster, altText }) => {
  return (
    <div className="movie-cover-images">
      <img className="movie-backdrop"
        src={`https://image.tmdb.org/t/p/w1400_and_h450_face${backdrop}`}
        alt={altText}
      />
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`}
          alt={altText}
        />
      </div>
    </div>
  );
};

export default MoviePoster;
