import React from "react";

const MovieSynopsis = ({ overview }) => {
  return (
    <div className="overview">
      <h3>Synopsis</h3>
      {overview}
    </div>
  );
};

export default MovieSynopsis;
