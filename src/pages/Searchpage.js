import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import "./Searchpage.scss";
import { doFetchData } from "../actions/fetchDataAction";
import { connect } from "react-redux";
import { getSearchResults, getIndicators } from "../selectors";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFieldValue: ""
    };
  }
  handleChange = e => {
    this.setState({
      searchFieldValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let searchTerm = this.state.searchFieldValue.toLowerCase();
   if(searchTerm) {
    this.props.doSearch(searchTerm);
   }
  };

  render() {
    const { searchFieldValue } = this.state;
    const { searchResults, indicators } = this.props;
    const { isLoading, isError, errorMsg } = indicators;

    let searchResultJSX;

    if (isLoading && !isError) {
      searchResultJSX = <Loader />;
    } else if (isError) {
      searchResultJSX = <ErrorDisplay errorMsg={errorMsg} />;
    } else {
      searchResultJSX =
        searchResults &&
        searchResults.map(movie => <MovieCard key={movie.id} movie={movie} />);
    }
    return (
      <div className="searchpage">
        <Searchbar
          value={searchFieldValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="search__results">{searchResultJSX}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    searchResults: getSearchResults(state),
    indicators: getIndicators(state),
    ...props
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSearch: searchTerm => dispatch(doFetchData(searchTerm)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
