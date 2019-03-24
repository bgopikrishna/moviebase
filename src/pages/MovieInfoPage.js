import React, { Component } from "react";
import { API_KEY } from "../constants";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import {
  getDataFromLocalStorage,
  storeDataInLocalStorage
} from "../helperfunctions/helpers";
import Modal from "../components/Modal";

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

    console.log(movieTrailer);

    const JSXwithTrailer = movieTrailer && (
      <div>
        <MovieCard movie={movie} />
        <button onClick={this.toggleModal}>Play Trailer</button>
        {/* <iframe
          width="auto"
          height="300px"
          title={movie.original_title}
          src={`https://www.youtube.com/embed/${movieTrailer.key}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /> */}
        <Modal
          toggleModal={this.toggleModal}
          modalState={modalState}
          title={movie.original_title}
        >
          {" "}
          <iframe
            width="100%"
            minheight="400px"
            title={movie.original_title}
            src={
              modalState ? `https://www.youtube.com/embed/${movieTrailer.key}` : ""
            }
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal>
      </div>
    );

    if (isLoading) {
      return <Loader />;
    } else if (!isError && Object.entries(movie).length !== 0) {
      return JSXwithTrailer;
    } else {
      return <p>{errorMsg}</p>;
    }
  }
}

export default MovieInfoPage;
