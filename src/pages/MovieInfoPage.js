import React, { Component } from "react";
import { API_KEY } from "../constants";
import MovieCard from "../components/MovieCard";

export class MovieInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isError: false,
      errorMsg: "Something Went Wrong",
      isLoading: true
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.movie_Id;
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US
    `)
      .then(data => data.json())
      .then(movie => this.setState({ movie, isLoading: false }))
      .catch(error =>
        this.setState({
          isError: true,
          errorMsg: error,
          isLoading: false
        })
      );
  }
  render() {
    const { movie, isError, errorMsg, isLoading } = this.state;
   
    if (isLoading) {
      return <p style={{ color: "white" }}>Loading</p>;
    } else if (!isError && Object.entries(movie).length !== 0) {
      return <MovieCard movie={movie} />;
    } else {
      return <p>{errorMsg}</p>;
    }
  }
}

export default MovieInfoPage;
