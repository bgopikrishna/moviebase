import React from "react";

const MovieOverView = ({ overview, credits }) => {
  const { cast, crew } = credits;
  const mainCast = cast.slice(0, 5);
  return (
    <div className="movie-overview">
      <div className="overview">
        <h3>Synopsis</h3>
        {overview}
      </div>
      <div className="cast-crew">
        <h3>Cast</h3>

        <div className="cast-info">
          {mainCast &&
            mainCast.map(cast => (
              <div className="cast-member-card" key={cast.id}>
                <img
                  className="cast-member-image"
                  src={`https://image.tmdb.org/t/p/w138_and_h175_face${
                    cast.profile_path
                  }`}
                  alt=""
                />
                <div className="cast-names">
                  <h4 className="cast-member-name">{cast.name}</h4>
                  <span className="cast-member-role">{cast.character}</span>
                </div>
              </div>
            ))}
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
