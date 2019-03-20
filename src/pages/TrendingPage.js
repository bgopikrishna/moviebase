import React, { Component } from "react";
import "./TrendingPage.scss";
import { API_BASE_URL, API_KEY } from "../constants";
import ErrorDisplay from "../components/ErrorDisplay";
import MovieCard from "../components/MovieCard";
import { parseJSON } from "../helperfunctions/helpers";
import { doFetchData } from "../actions/fetchDataAction";
import Loader from "../components/Loader";

export class TrendingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trendingMoviesList: [],
      isError: false,
      errorMsg: "Some Thing Went Wrong",
      currentPage: 1,
      isLoading: true
    };
  }

  //Fetches data based on the page default: currentPage = 1
  doFetchData = currentPage => {
    fetch(
      `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${currentPage}` //making call to api
    )
      .then(parseJSON) //Helper function for parsing JSON
      .then(data =>
        //Setting the state and updating the state
        this.setState(state => {
          const { currentPage, trendingMoviesList } = state;
          return {
            //adding movies objects
            trendingMoviesList: [...trendingMoviesList, ...data.results],
            currentPage: currentPage + 1,
            isLoading: false
          };
        })
      )
      .catch(
        error => this.setState({ isError: true, errorMsg: error.message }) //Error Handling
      );
  };

  //Pagination using the currentPage , it triggers when clikced more button

  handleMore = () => {
    const { currentPage } = this.state;
    this.doFetchData(currentPage);
  };

  componentDidMount() {
    //Fetching the trending movies on page 1 on component mounts

    const { currentPage } = this.state;

    //Fetching and setting data
    this.doFetchData(currentPage);
  }

  render() {
    const { trendingMoviesList, isError, errorMsg, isLoading } = this.state;

    //Iterating through trendingResults Array of movies
    const trendingResultsJSX = trendingMoviesList.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ));

    return (
      <div className="trending">
        <h2 className="trending__heading">Trending movies this week</h2>
        <div className="trending__results">{trendingResultsJSX}</div>
        <button className="more_button" onClick={() => this.handleMore()}>
          More
        </button>
        {isLoading && <Loader />}
        {isError && <ErrorDisplay errorMsg={errorMsg} />}
      </div>
    );
  }
}

export default TrendingPage;
