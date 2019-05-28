import React from "react";

const MovieSynopsis = ({ overview }) => {
  return (
    <div className="overview">
      <h2>Synopsis</h2>
      {overview}
    </div>
  );
};

export default MovieSynopsis;
