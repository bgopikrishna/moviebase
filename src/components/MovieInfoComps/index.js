import React, { Component } from "react";
import MoviePoster from "./MoviePoster";
import "./index.scss";
import MovieDetails from "./MovieDetails";
import MovieActionBtns from "./MovieActionBtns";
import { doMarkFavourite } from "../../actions/favouriteAction";
import { addToWatchList } from "../../actions/watchListAction";
import { connect } from "react-redux";
import MovieOverView from "./MovieOverView";
import { API_BASE_URL, API_KEY } from "../../constants";
import { parseJSON } from "../../helperfunctions/helpers";
import {withRouter} from 'react-router-dom';

export class MovieInfoComp extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-vars
    let _isMounted = false;

    this.state = {
      similarMovies: [],
      isErrorFetchingSimilarMovies: false
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

  componentDidMount() {
    const { movie } = this.props;
    const { id } = movie;
    this._isMounted = true;
    console.log("fetching starts");
    fetch(`${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
      .then(parseJSON)
      .then(data => data.results)
      .then(data => {
        if (this._isMounted === true) {
          console.log("setting datas");

          this.setState({ similarMovies: data });
        }
      })
      .catch(this.setState({ isErrorFetchingSimilarMovies: true }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      movie,
      toggleModal,
      favIds,
      watchListIds,
      addToFavList,
      addToWatchList
    } = this.props;
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
    const { similarMovies, isErrorFetchingSimilarMovies } = this.state;

    return (
      <div className="movie-container">
        <MoviePoster
          backdrop={backdrop_path}
          poster={poster_path}
          altText={original_title}
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
          />
        </div>
        <MovieOverView
          overview={overview}
          credits={credits}
          similarMovies={similarMovies}
          isErrorFetchingSimilarMovies={isErrorFetchingSimilarMovies}
        />
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
const mapStateToProps = (state, props) => {
  //Syncing the data of favourites movies with store and dispalying for user if it's already liked
  return {
    ...props,
    favIds: state.favItems.ids,
    watchListIds: state.watchListItems.ids
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withRouter(MovieInfoComp));
