import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import "./Searchpage.scss";
import { doFetchData } from "../actions/fetchDataAction";
import { connect } from "react-redux";
import { getSearchResults } from "../selectors";

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
    this.props.doSearch(this.state.searchFieldValue);
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
        {searchResults &&
          searchResults.map(item => <li key={item.id}>{item.title}</li>)}
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
    doSearch: searchTerm => dispatch(doFetchData(searchTerm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
