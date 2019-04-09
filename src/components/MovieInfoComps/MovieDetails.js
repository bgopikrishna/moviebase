import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { genres as movieGenres } from "../../constants";

const MovieDetails = ({
  movieTitle,
  tagline,
  original_language,
  genres,
  release_date
}) => {
  const genreIds = genres.map(genre => genre.id).slice(0, 3);
  return (
    <div className="movie-details">
      <div className="movie-name">
        <h2>{movieTitle}</h2>
        <div className="other-details">
          <span>{tagline}</span>
        </div>
      </div>
      <div className="movie-genre">
        {/* <span className="transparent-pill">Action</span>
        <span className="transparent-pill">Drama</span>
        <span className="transparent-pill">Fight</span>

        <span className="transparent-pill">Fantasy</span>
        <span className="transparent-pill">Action</span> */}
        {genreIds.length !== 0 &&
          genreIds.map(genreId => (
            <span className="transparent-pill" key={genreId}>
              {movieGenres[genreId].name}
            </span>
          ))}
      </div>
      <div className="release-date">
        <span>
          <FontAwesomeIcon icon={faCalendarWeek} /> {release_date}
        </span>
      </div>
    </div>
  );
};

export default MovieDetails;
