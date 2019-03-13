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
      searchFieldValue: e.target.value.toLowerCase()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(() => ({ isLoading: true }));
    this.props.doSearch(this.state.searchFieldValue);
    this.setState({ isLoading: false });
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
    searchResults: getSearchResults(state),
    ...props
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
