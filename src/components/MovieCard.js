import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <div className="card__image">
        <img
          src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/pfte7wdMobMF4CVHuOxyu6oqeeA.jpg"
          alt=""
        />
      </div>
      <div className="card__stacked">
        <div className="card__content">
          <h3 className="card__title">Big Family</h3>
          <span>October 15, 2014</span>
          <p>
            "Last months of World War II in April 1945. As the Allies make their
            final push in the European Theat"
          </p>
        </div>
        <div className="card__action">
          <a href="/">More Info</a>
          <button>
            <i className="fas fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
