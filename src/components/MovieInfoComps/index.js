import React, { Component } from "react";
import MoviePoster from "./MoviePoster";
import "./index.scss";
import MovieDetails from "./MovieDetails";
import MovieActionBtns from "./MovieActionBtns";
import { doMarkFavourite } from "../../store/actions/favouriteAction";
import { addToWatchList } from "../../store/actions/watchListAction";
import { connect } from "react-redux";
import { API_BASE_URL, API_KEY } from "../../constants";
import {
  parseJSON,
  getFavListAndWatchListIds
} from "../../helperfunctions/helpers";
import MovieSynopsis from "./MovieSynopsis";
import MovieCastCrew from "./MovieCastCrew";
import SimilarMovies from "./SimilarMovies";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

/*

This Component renderers the total movieInfo page

takes movie object as prop

 */

let _isMounted = false;

export class MovieInfoComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      similarMovies: [],
      isErrorFetchingSimilarMovies: false,
      movieId: ""
    };
  }

  //This fun adds or remove items from
  handleFavBtn = () => {
    const { movie, addToFavList } = this.props;

    /**
     * @param {object} movie movieobject
     * @param {string} movieId movieId
     */
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
        if (_isMounted === true) {
          this.setState(() => ({
            similarMovies: data.results,
            isErrorFetchingSimilarMovies: false
          }));
        }
      })
      .catch(this.setState({ isErrorFetchingSimilarMovies: true }));
  };

  componentDidMount() {
    _isMounted = true;
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
    _isMounted = false;
  }

  render() {
    const { movie, toggleModal, firestoreData, userId } = this.props;
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

    const [favlistIds, watchlistIds] = getFavListAndWatchListIds(
      firestoreData,
      userId
    );

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
            favlistIds={favlistIds}
            watchlistIds={watchlistIds}
          />
        </div>
        <div className="movie-overview">
          <MovieSynopsis overview={overview} />
          <MovieCastCrew credits={credits} />
          {similarMovies.length !== 0 && (
            <SimilarMovies similarMovies={similarMovies} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userId = state.firebase.auth.uid;
  const firestoreData = state.firestore.data.data
    ? state.firestore.data.data
    : null;

  return {
    firestoreData,
    userId
  };
};

//Connect the action creators and dispatching  to the component
const mapDisptachToProps = dispatch => {
  return {
    addToFavList: (movie, id) => dispatch(doMarkFavourite(movie, id)),
    addToWatchList: (movie, id) => dispatch(addToWatchList(movie, id))
  };
};

//Connecting  the redux central store to the component
const enhanceWithFirestore = compose(
  connect(
    mapStateToProps,
    mapDisptachToProps
  ),
  firestoreConnect(["data"]) // sync data collection from Firestore into redux
);

export default enhanceWithFirestore(MovieInfoComp);

//Type checking
MovieInfoComp.propTypes = {
  movie: PropTypes.object.isRequired
};
