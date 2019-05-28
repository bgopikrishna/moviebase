import React, { Component, Fragment } from "react";
import { API_KEY } from "../constants";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../components/extras/Loader";
import {
  getDataFromLocalStorage,
  storeDataInLocalStorage,
  parseJSON
} from "../helperfunctions/helpers";
import Modal from "../components/movie/Modal";
import "./MovieInfoPage.scss";
import MovieInfoComp from "../components/MovieInfoComps";
import { movieInfoParser } from "../helperfunctions/movieInfoParser";
import YTIFrame from "../components/extras/IFrame";

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
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos
    `)
        .then(parseJSON)
        .then(movieFromApi => {
          //setting movie data in local storage
          const movie = movieInfoParser(movieFromApi);

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
    /*
    Updating similar movies in  page based on the movie ID provided in route params 
    returns newMovie ID based on the route params
  */

    if (nextProps.match.params.movie_Id !== prevState.movie.id) {
      return {
        movieId: nextProps.match.params.movie_Id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    /*
    Updating similar movies in  page based on the movie ID provided in route params 
  */

    if (this.props.match.params.movie_Id !== prevProps.match.params.movie_Id) {
      //Scroll to top
      window.scrollTo(0, 0);

      //Enable Loading Indicator
      this.setState(() => ({ isLoading: true }));

      //If the prev Movie ID not matches current route parmam ID then fetch the movie data
      this.fetchMovieData();
    }
  }

  toggleModal = () => {
    /**
     * To
     */
    this.setState(state => ({ modalState: !state.modalState }));
  };

  render() {
    const { movie, isError, errorMsg, isLoading, modalState } = this.state;
    let movieTrailer =
      Object.entries(movie).length !== 0 && movie.hasOwnProperty("videos")
        ? movie.videos.results.filter(video => video.type === "Trailer")[0]
        : {};

    //Redirect if not signed in
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    if (isLoading) {
      return <Loader />;
    } else if (!isError && Object.entries(movie).length !== 0) {
      return (
        <Fragment>
          <MovieInfoComp movie={movie} toggleModal={this.toggleModal} />

          {movieTrailer.hasOwnProperty("type") && (
            <Modal toggleModal={this.toggleModal} modalState={modalState}>
              <YTIFrame
                src={
                  modalState
                    ? `https://www.youtube-nocookie.com/embed/${
                        movieTrailer.key
                      }`
                    : ""
                }
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

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(MovieInfoPage);
