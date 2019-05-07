import React from "react";
import StackedImageCard from './StackedImageCard';

const MovieCastCrew = ({ credits }) => {
  const { cast, crew } = credits;
  const mainCast = cast.slice(0, 12);
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
    <React.Fragment>
      <div className="stacked-grid">
        <h3>Featured Cast</h3>

        <div className="stacked-grid-header">
          {/**Main cast details */}
          {mainCast &&
            mainCast.map(cast => (
              <StackedImageCard
                key={cast.id}
                image={cast.profile_path}
                altForImage={cast.name}
                cardHeader={cast.name}
                cardFooter={cast.character}
              />
            ))}
        </div>
      </div>
      <div className="stacked-grid">
        <h3>Featured Crew</h3>

        <div className="stacked-grid-header">
          {/**Main cast details */}

          {mainCrew &&
            mainCrew.map(crew => (
              <StackedImageCard
                image={crew.profile_path}
                altForImage={crew.name}
                cardHeader={crew.name}
                cardFooter={crew.job}
                key={crew.id + crew.job}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieCastCrew;
