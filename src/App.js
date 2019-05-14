import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/layout/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";
import MovieInfoPage from "./pages/MovieInfoPage";
import { BrowserRouter as Router } from "react-router-dom";
import MovieListPage from "./pages/MovieListPage";
import Footer from "./components/layout/Footer";
import TrendingPage from "./pages/TrendingPage";
import ErrorDisplay from "./components/extras/ErrorDisplay";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOnline: true
    };
  }

  componentDidMount() {
  

    //Checking internet connection for the user
    fetch("https://jsonplaceholder.typicode.com/posts").catch(() =>
      this.setState(() => ({ isOnline: false }))
    );
  }

  render() {
    const { isOnline } = this.state;

    if (isOnline) {
      return (
        <Router>
          <div className="app">
            {/* Navigation Bar */}
            <Navbar />

            <div className="container">
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
                <Route
                  exact
                  path="/movie/:movie_Id"
                  component={MovieInfoPage}
                />

                {/* 404 Page Component */}
                <Route
                  path="/cast/:id"
                  component={props => {
                    window.location = `https://www.themoviedb.org/person/${
                      props.match.params.id
                    }`;
                    return null;
                  }}
                />
                {/** Sign In Page */}
                <Route path="/signin" component={SignIn} />

                {/** Sign Up Page */}
                <Route path="/signup" component={SignUp} />

                <Route component={NoPage404} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      );
    } else {
      return (
        <ErrorDisplay errorMsg="This app requires Internet, Please connect to wifi/turn on mobile data" />
      );
    }
  }
}

export default App;
