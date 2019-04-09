import React, { Component, Fragment } from "react";
import { API_KEY } from "../constants";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import {
  getDataFromLocalStorage,
  storeDataInLocalStorage
} from "../helperfunctions/helpers";
import Modal from "../components/Modal";
import "./MovieInfoPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import MoviePoster from "../components/MovieInfoComps/MoviePoster";
import MovieInfoComp from "../components/MovieInfoComps";

export class MovieInfoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      isError: false,
      errorMsg: "Something Went Wrong",
      isLoading: true,
      modalState: false
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.movie_Id;
    const movie = getDataFromLocalStorage(movieId);
    if (movie) {
      this.setState({ movie, isLoading: false });
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&&append_to_response=credits,videos
    `)
        .then(data => data.json())
        .then(movie => {
          //setting movie data in local storage
          storeDataInLocalStorage(movieId, movie);

          this.setState({ movie, isLoading: false });
        })
        .catch(error =>
          this.setState({
            isError: true,
            errorMsg: error,
            isLoading: false
          })
        );
    }
  }

  toggleModal = () =>
    this.setState(state => ({ modalState: !state.modalState }));

  render() {
    const { movie, isError, errorMsg, isLoading, modalState } = this.state;
    let movieTrailer =
      Object.entries(movie).length !== 0 && movie.hasOwnProperty("videos")
        ? movie.videos.results.filter(video => video.type === "Trailer")[0]
        : {};

    const { backdrop_path, poster_path, original_title } = movie;

    const MovieInfoJSX = (
      <div className="movie-info">
        <MovieCard movie={movie} truncateText={false} />
        <button
          className="play-trailer"
          onClick={this.toggleModal}
          disabled={movieTrailer ? false : true}
        >
          <FontAwesomeIcon icon={faPlay} />
          &nbsp;Play Trailer
        </button>
        {movieTrailer && (
          <Modal
            toggleModal={this.toggleModal}
            modalState={modalState}
            title={movie.original_title + " Trailer"}
          >
            {" "}
            <iframe
              className="iframe-yt"
              title={movie.original_title}
              src={
                modalState
                  ? `https://www.youtube.com/embed/${movieTrailer.key}`
                  : ""
              }
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Modal>
        )}
      </div>
    );

    if (isLoading) {
      return <Loader />;
    } else if (!isError && Object.entries(movie).length !== 0) {
      return (
        <Fragment>
          <MovieInfoComp movie={movie} toggleModal={this.toggleModal} />

          {movieTrailer && (
            <Modal
              toggleModal={this.toggleModal}
              modalState={modalState}
              title={movie.original_title + " Trailer"}
            >
              {" "}
              <iframe
                className="iframe-yt"
                title={movie.original_title}
                src={
                  modalState
                    ? `https://www.youtube.com/embed/${movieTrailer.key}`
                    : ""
                }
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal>
          )}
        </Fragment>
      );
    } else {
      return <p>{errorMsg}</p>;
    }
  }
}

export default MovieInfoPage;
