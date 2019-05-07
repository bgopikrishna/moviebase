import React, { Component, Fragment } from "react";
import { API_KEY } from "../constants";
import Loader from "../components/extras/Loader";
import {
  getDataFromLocalStorage,
  storeDataInLocalStorage,
  parseJSON
} from "../helperfunctions/helpers";
import Modal from "../components/movie/Modal";
import "./MovieInfoPage.scss";
import MovieInfoComp from "../components/MovieInfoComps";

export class MovieInfoPage extends Component {
  constructor(props) {
    super(props);
    this.movieInfoDivRef = React.createRef();
    this.state = {
      movie: {},
      isError: false,
      errorMsg: "Something Went Wrong",
      isLoading: true,
      modalState: false,
      movieId: ""
    };
  }

  fetchMovieData = () => {
    const movieId = this.props.match.params.movie_Id;
    const movie = getDataFromLocalStorage(movieId);
    if (movie) {
      this.setState({ movie, isLoading: false });
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&&append_to_response=credits,videos
    `)
        .then(parseJSON)
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
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchMovieData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps", nextProps);
    // console.log("prevState", prevState);

    if (nextProps.match.params.movie_Id !== prevState.movie.id) {
      return {
        movieId: nextProps.match.params.movie_Id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movie_Id !== prevProps.match.params.movie_Id) {
      this.setState(() => ({ isLoading: true }));
      this.fetchMovieData();
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
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
              <iframe
                className="iframe-yt"
                title={movie.original_title}
                src={
                  modalState
                    ? `https://www.youtube-nocookie.com/embed/${
                        movieTrailer.key
                      }`
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
