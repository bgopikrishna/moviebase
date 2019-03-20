import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";
import MovieInfoPage from "./pages/MovieInfoPage";
import { BrowserRouter as Router } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import Footer from "./components/Footer";
import TrendingPage from "./pages/TrendingPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* Navigation Bar */}
          <Navbar />

          <Switch>
            {/* Home Component */}
            <Route exact path="/" component={TrendingPage} />
            <Route exact path="/home" component={TrendingPage} />
            <Route exact path="/trending" component={TrendingPage} />

            {/*Search Component */}
            <Route exact path="/search" component={SearchPage} />

            {/* 404 Page Component */}
            <Route path="/list" component={MovieListPage} />

            {/* account Component */}
            <Route path="/account" component={NoPage404} />

            {/* MovieInfo Page Component */}
            <Route path="/movie/:movie_Id" component={MovieInfoPage} />

            {/* 404 Page Component */}
            <Route path="/404" component={NoPage404} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
