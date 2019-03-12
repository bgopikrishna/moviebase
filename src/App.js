import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";
import MovieInfoPage from "./pages/MovieInfoPage";

class App extends Component {
  render() {
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
  }
}

export default App;
