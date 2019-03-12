import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import "./Searchpage.scss";
import { doFetchData } from "../actions/fetchDataAction";
import { connect } from "react-redux";
import { getSearchResults } from "../selectors";
import MovieCard from "../components/MovieCard";
import { doMarkFavourite } from "../actions/favouriteAction";

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
    const { searchFieldValue } = this.state;
    const { doSearch } = this.props;
    doSearch(searchFieldValue.toLowerCase());
    e.target.reset();
  };

  render() {
    const { searchFieldValue } = this.state;
    const { searchResults } = this.props;
    return (
      <div className="searchpage">
        <Searchbar
          value={searchFieldValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="search__results">
          {searchResults &&
            searchResults.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    searchResults: getSearchResults(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSearch: searchTerm => dispatch(doFetchData(searchTerm)),
    doMarkFav: (movie, id) => dispatch(doMarkFavourite(movie, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
