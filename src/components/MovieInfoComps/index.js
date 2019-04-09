import React, { Component } from "react";
import MoviePoster from "./MoviePoster";
import "./index.scss";
import MovieDetails from "./MovieDetails";
import MovieActionBtns from "./MovieActionBtns";
import { doMarkFavourite } from "../../actions/favouriteAction";
import { addToWatchList } from "../../actions/watchListAction";
import { connect } from "react-redux";
import MovieOverView from "./MovieOverView";

export class MovieInfoComp extends Component {
  handleFavBtn = () => {
    const { movie, addToFavList } = this.props;
    addToFavList(movie, movie.id);
  };
  handleWatchListBtn = () => {
    const { movie, addToWatchList } = this.props;
    addToWatchList(movie, movie.id);
  };

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
        <MovieOverView overview={overview} credits={credits} />
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
)(MovieInfoComp);
