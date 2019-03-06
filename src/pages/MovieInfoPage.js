import React, { Component } from "react";
import { API_KEY } from "../constants";
import { ifNotExists } from "../helperfunctions/helpers";
import MovieCard from "../components/MovieCard";
import CheckConsole from "../components/CheckConsole";

export class MovieInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isError: false,
      errorMsg: "Something Went Wrong"
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.movie_Id
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US
    `)
      .then(data => data.json())
      .then(movie => this.setState({ movie }))
      .catch(error =>
        this.setState({
          isError: true,
          errorMsg: error
        })
      );
  }
  render() {
    const { movie, isError, errorMsg } = this.state;
    // let {
    //   id,
    //   vote_average,
    //   poster_path,
    //   original_title,
    //   overview,
    //   release_date
    // } = this.state.movie;

    // vote_average = ifNotExists(vote_average, vote_average + "/10", "N/A");
    // poster_path = ifNotExists(
    //   poster_path,
    //   `https://image.tmdb.org/t/p/w185/${poster_path}`,
    //   "https://via.placeholder.com/200x120/000000/FFFFFF/?text=No Image"
    // );
    // overview = ifNotExists(overview, overview.slice(0, 100) + "...", "No Data");
    // original_title = ifNotExists(
    //   original_title,
    //   original_title.slice(0, 40),
    //   "No data"
    // );
    // release_date = ifNotExists(release_date, release_date, "-");

    if (!isError && Object.entries(movie).length !== 0) {
      return <MovieCard movie={movie} />;
    } else {
      return <p>{errorMsg}</p>;
    }
    // return <CheckConsole />;
  }
}

export default MovieInfoPage;
