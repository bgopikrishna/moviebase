import React from "react";
import StackedImageCard from "./StackedImageCard.js";

const SimilarMovies = ({ similarMovies }) => {
  return (
    <div className="stacked-grid">
      <h2>Similar Movies</h2>

      <div className="stacked-grid-header">
        {similarMovies.length &&
          similarMovies.map(movie => (
            <StackedImageCard
              image={movie.poster_path}
              altForImage={movie.original_title}
              cardHeader={movie.original_title}
              cardFooter={`Rating: ${movie.vote_average}`}
              linkTo={`/movie/${movie.id}`}
              key={movie.id}
            />
          ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
