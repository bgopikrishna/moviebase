import React from "react";
import { placeholderImage } from "../../helperfunctions/helpers.js";
import StackedImageCard from "../StackedImageCard.js";
import { Link } from "react-router-dom";
import { MOVIE_DB_BIO_LINK } from "../../constants/index.js";

const MovieOverView = ({
  overview,
  credits,
  similarMovies,
  isErrorFetchingSimilarMovies
}) => {
  const { cast, crew } = credits;
  const mainCast = cast.slice(0, 5);
  const mainCrew = crew.filter(crewMem => {
    if (
      (crewMem.job === "Director") |
      (crewMem.job === "Producer") |
      (crewMem.job === "Editor") |
      (crewMem.job === "Writer")
    ) {
      return crewMem;
    }
    return null;
  });

  return (
    <div className="movie-overview">
      <div className="overview">
        <h3>Synopsis</h3>
        {overview}
      </div>
      <div className="cast-crew">
        <h3>Featured Cast</h3>

        <div className="cast-info">
          {/**Main cast details */}
          {mainCast &&
            mainCast.map(cast => (
              <div className="cast-member-card" key={cast.id + cast.name}>
                <img
                  className="cast-member-image"
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w138_and_h175_face${
                          cast.profile_path
                        }`
                      : placeholderImage(`No Image found for ${cast.name}`)
                  }
                  alt={cast.name}
                />
                <div className="cast-names">
                  <h4 className="cast-member-name">{cast.name}</h4>
                  <span className="cast-member-role">{cast.character}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="cast-crew">
        <h3>Featured Crew</h3>

        <div className="cast-info">
          {/**Main cast details */}

          {mainCrew &&
            mainCrew.map(crew => (
              <StackedImageCard
                image={crew.profile_path}
                altForImage={crew.name}
                cardHeader={crew.name}
                cardFooter={crew.job}
                key={crew.id + crew.job}
                linkTo={`${MOVIE_DB_BIO_LINK}${crew.id}`}
              />
            ))}
        </div>
        <div className="cast-crew">
          <h3>Similar Movies</h3>

          <div className="cast-info">
            {true &&
              similarMovies.map(movie => (
                <div className="cast-member-card" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      className="cast-member-image"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w138_and_h175_face${
                              movie.poster_path
                            }`
                          : placeholderImage("No Image")
                      }
                      alt={movie.original_title}
                    />
                  </Link>
                  <div className="cast-names">
                    <Link to={`/movie/${movie.id}`}>
                      <h4 className="cast-member-name">
                        {movie.original_title}
                      </h4>
                    </Link>
                    <span className="cast-member-role">
                      {movie.release_date}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieOverView;

//
//   /* <div className="cast-member">
//             <img
//               className="cast-member-image"
//               src="https://image.tmdb.org/t/p/w138_and_h175_face/nTABNG8Sw4EVN3xodn2JBdEmBqv.jpg"
//               alt=""
//             />
//             <h4 className="cast-member-name">Jason Moma</h4>
//             <span className="cast-member-role">aqua Man</span>
//           </div> */
//

// <div className="cast-member-card" key={crew.id + crew.job}>
//                 <img
//                   className="cast-member-image"
//                   src={
//                     crew.profile_path
//                       ? `https://image.tmdb.org/t/p/w138_and_h175_face${
//                           crew.profile_path
//                         }`
//                       : placeholderImage("No Image")
//                   }
//                   alt={crew.name}
//                 />
//                 <div className="cast-names">
//                   <h4 className="cast-member-name">{crew.name}</h4>
//                   <span className="cast-member-role">{crew.job}</span>
//                 </div>
// {/* </div> */}
