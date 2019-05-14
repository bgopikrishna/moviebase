export const movieInfoParser = movie => {
  const {
    backdrop_path,
    poster_path,
    original_title,
    tagline,
    vote_average: rating,
    vote_count: totalVotes,
    genres,
    release_date,
    overview,
    credits,
    id,
    videos
  } = movie;

  //Passing only required details for movies

  const movieWithRequiredDetails = {
    backdrop_path,
    poster_path,
    original_title,
    tagline,
    vote_average: rating,
    vote_count: totalVotes,
    genres,
    release_date,
    overview,
    credits,
    id,
    videos
  };


  return movieWithRequiredDetails;
};

