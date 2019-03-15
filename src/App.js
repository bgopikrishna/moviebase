import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";
import MovieInfoPage from "./pages/MovieInfoPage";
import Loader from "./components/Loader";

class App extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    if (!isLoading) {
      return (
        <div className="app">
          <Navbar />

          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/search" component={SearchPage} />

            <Route path="/404" component={NoPage404} />
            <Route path="/account" component={NoPage404} />
            <Route path="/movie/:movie_Id" component={MovieInfoPage} />
          </Switch>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default App;
