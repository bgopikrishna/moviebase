import React, { Component } from "react";
import "./TrendingPage.scss";
import { API_BASE_URL, API_KEY } from "../constants";
import MovieCard from "../components/movie/MovieCard";
import {
  parseJSON,
  getFavListAndWatchListIds
} from "../helperfunctions/helpers";
import Loader from "../components/extras/Loader";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

export class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingMoviesList: [],
      isError: false,
      errorMsg: "",
      currentPage: 1,
      isLoading: true
    };
  }

  //Fetches data based on the page default: currentPage = 1
  doFetchData = () => {
    const { currentPage } = this.state;
    this.setState(() => ({ isLoading: true }));

    fetch(
      `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${currentPage}` //making call to api
    )
      .then(parseJSON) //Helper function for parsing JSON
      .then(data =>
        //Setting the state and updating the state
        this.setState(state => {
          const { currentPage, trendingMoviesList } = state;
          const newList = [...trendingMoviesList, ...data.results];
          return {
            //adding movies objects
            trendingMoviesList: newList,
            currentPage: currentPage + 1,
            isLoading: false,
            isError: false
          };
        })
      )
      .catch(
        error =>
          this.setState({
            isError: true,
            errorMsg: error.message,
            isLoading: false
          }) //Error Handling
      );
  };

  //Pagination using the currentPage , it triggers when clikced more button

  handleMore = () => {
    this.doFetchData();
  };

  scrollHandler = () => {
    const { trendingMoviesList, isLoading } = this.state;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      trendingMoviesList.length &&
      !isLoading
    ) {
      this.doFetchData();
    }
  };

  componentDidMount() {
    //Fetching the trending movies on page 1 on component mounts

    window.addEventListener("scroll", this.scrollHandler, false);

    const { currentPage } = this.state;
    if (this.props.auth.uid) {
      //Fetching and setting data
      this.doFetchData(currentPage);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler, false);
  }

  render() {
    //Redirect if not signed in

    if (!this.props.auth.uid) return <Redirect to="signin" />;

    //Redirect

    const { trendingMoviesList, isError, errorMsg, isLoading } = this.state;
    const { userId, firestoreData } = this.props;
    let [favlistIds, watchlistIds] = getFavListAndWatchListIds(
      firestoreData,
      userId
    );

    //Iterating through trendingResults Array of movies
    const trendingResultsJSX = trendingMoviesList.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        favlistIds={favlistIds}
        watchlistIds={watchlistIds}
      />
    ));

    return (
      <div className="trending">
        <h2 className="trending__heading">Trending movies this week</h2>
        <div className="trending__results">{trendingResultsJSX}</div>

        {isLoading && <Loader />}
        {isError && (
          <button className="more_button" onClick={() => this.handleMore()}>
            Try Again
          </button>
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  auth: state.firebase.auth,
  firestoreData: state.firestore.data.data ? state.firestore.data.data : null,
  userId: state.firebase.auth.uid
});

const enhanceWithFirestore = compose(
  connect(mapStateToProps),
  firestoreConnect(["data"]) // sync data collection from Firestore into redux
);
export default enhanceWithFirestore(TrendingPage);
