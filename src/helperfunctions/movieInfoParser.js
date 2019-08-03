import { ifNotExists } from "./helpers";

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


export const movieCardInfoParser = (movie,truncateText=true) => {
    //Destructring data from the movie object
    let {
      id,
      vote_average,
      poster_path,
      original_title,
      overview,
      release_date
    } = movie;
  
    /* ifNotExists is func whick checks if the info is available or not (from movie obj properties), 
    if not available replaces with respected message  */
    /**Checking  -starts */
    vote_average = ifNotExists(vote_average, vote_average + "/10", "N/A");
    poster_path = ifNotExists(
      poster_path,
      `https://image.tmdb.org/t/p/w185/${poster_path}`,
      "https://via.placeholder.com/200x120/000000/FFFFFF/?text=No Image"
    );
    overview = ifNotExists(overview, overview, "No Data");
    overview = truncateText ? overview.slice(0, 100) + "..." : overview;
  
    original_title = ifNotExists(
      original_title,
      original_title.slice(0, 40),
      "No data"
    );
    release_date = ifNotExists(release_date, release_date, "-");
  
    /**Checking  -ends */
  
    return {
      id,
      vote_average,
      poster_path,
      original_title,
      overview,
      release_date
    }
}
