import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import "./Searchpage.scss";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFieldValue: ""
    };
  }
  handleChange = e => {
    this.setState({
      searchFieldValue: e.currentTarget.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { searchFieldValue } = this.state;
    return (
      <div className="searchpage">
        <Searchbar value={searchFieldValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default SearchPage;
