import React, { Component } from "react";
import MoviePoster from "./MoviePoster";
import "./index.scss";
import MovieDetails from "./MovieDetails";
import MovieActionBtns from "./MovieActionBtns";
import { doMarkFavourite } from "../../store/actions/favouriteAction";
import { addToWatchList } from "../../store/actions/watchListAction";
import { connect } from "react-redux";
import { API_BASE_URL, API_KEY } from "../../constants";
import { parseJSON } from "../../helperfunctions/helpers";
import { withRouter } from "react-router-dom";
import MovieSynopsis from "./MovieSynopsis";
import MovieCastCrew from "./MovieCastCrew";
import SimilarMovies from "./SimilarMovies";

export class MovieInfoComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      similarMovies: [],
      isErrorFetchingSimilarMovies: false,
      movieId: ""
    };
  }

  handleFavBtn = () => {
    const { movie, addToFavList } = this.props;
    addToFavList(movie, movie.id);
  };

  handleWatchListBtn = () => {
    const { movie, addToWatchList } = this.props;
    addToWatchList(movie, movie.id);
  };

  getAndSetSimiliarMovies = () => {
    const { movie } = this.props;
    const { id } = movie;
    fetch(`${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
      .then(parseJSON)

      .then(data => {
        if (this._isMounted === true) {
          this.setState(() => ({
            similarMovies: data.results,
            isErrorFetchingSimilarMovies: false
          }));
        }
      })
      .catch(this.setState({ isErrorFetchingSimilarMovies: true }));
  };

  componentDidMount() {
    this._isMounted = true;
    this.getAndSetSimiliarMovies();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.movie.id !== prevState.movieId) {
      return {
        movieId: nextProps.movie.id
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie.id !== this.props.movie.id) {
      this.getAndSetSimiliarMovies();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { movie, toggleModal } = this.props;
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
      id
    } = movie;
    const { similarMovies } = this.state;

    let isTrailerAvailable =
      movie.hasOwnProperty("videos") && movie.videos.results.length
        ? true
        : false;
    return (
      <div className="movie-container" id="movie-details">
        <MoviePoster
          backdrop={backdrop_path}
          poster={poster_path}
          altText={original_title}
          toggleModal={toggleModal}
          isTrailerAvailable={isTrailerAvailable}

        />
        <div className="row-2">
          <MovieDetails
            movieTitle={original_title}
            tagline={tagline}
            genres={genres}
            release_date={release_date}
          />
          <MovieActionBtns
            rating={rating}
            toggleModal={toggleModal}
            handleFavBtn={this.handleFavBtn}
            handleWatchListBtn={this.handleWatchListBtn}
            totalVotes={totalVotes}
            movieId={id}
            isTrailerAvailable={isTrailerAvailable}
          />
        </div>
        <div className="movie-overview">
          <MovieSynopsis overview={overview} />
          <MovieCastCrew credits={credits} />
          {similarMovies.length && (
            <SimilarMovies similarMovies={similarMovies} />
          )}
        </div>
      </div>
    );
  }
}

//Connect the action creators and dispatching  to the component
const mapDisptachToProps = dispatch => {
  return {
    addToFavList: (movie, id) => dispatch(doMarkFavourite(movie, id)),
    addToWatchList: (movie, id) => dispatch(addToWatchList(movie, id))
  };
};

//Connecting  the redux central store to the component

export default connect(
  null,
  mapDisptachToProps
)(withRouter(MovieInfoComp));
