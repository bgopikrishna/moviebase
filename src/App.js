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
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { connect } from "react-redux";
import { doSetUserId } from "./store/actions/authActions";
import AccountPage from "./pages/AccountPage";
import CreditsPage from "./pages/CreditsPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ErrorImageSVG from "./images/Error.svg";
import Loader from "./components/extras/Loader";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOnline: true,
      isLoading: true
    };
  }

  componentDidMount() {
    /*
    Turn off the loader &&
    Checking internet connection for the user by making a fake api call and urn off the loader
    */
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(() => this.setState(() => ({ isOnline: true, isLoading: false })))
      .catch(() =>
        this.setState(() => ({ isOnline: false, isLoading: false }))
      );

    //If the user signed in set the userId in the redux store
    if (this.props.uid && this.state.isOnline) {
      const userId = this.props.uid;
      this.props.doSetUserId(userId);
    }
  }

  

  render() {
    const { isOnline, isLoading } = this.state;

    if (isLoading) return <Loader />;

    if (isOnline) {
      return (
        <Router>
          <div className="app">
            {/* Navigation Bar */}
            <Navbar />

            <div className="container">
              <Switch>
                {/* Home/Trending Page Component */}
                <Route exact path="/" component={TrendingPage} />
                <Route path="/home" component={TrendingPage} />
                <Route path="/trending" component={TrendingPage} />

                {/*Search Component */}
                <Route exact path="/search" component={SearchPage} />

                {/* 404 Page Component */}
                <Route path="/list" component={MovieListPage} />

                {/* account Component */}
                <Route path="/account" component={AccountPage} />

                {/* MovieInfo Page Component */}
                <Route
                  exact
                  path="/movie/:movie_Id"
                  component={MovieInfoPage}
                />

                {/* Cast Page Component (opens in newtab)*/}
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

                {/**Password Forget Page */}
                <Route path="/forgotpassword" component={ForgotPassPage} />

                {/**credits  Page */}
                <Route path="/credits" component={CreditsPage} />

                {/**404 page  Page */}
                <Route component={NoPage404} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      );
    } else {
      return (
        <div className="app-error">
          <div className="app-error-image">
            <img src={ErrorImageSVG} alt="Internet Connection Required" />
          </div>
          <ErrorDisplay
            errorMsg="This app requires Internet, Please connect to wifi/turn on mobile data"
            refresh={true}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

const mapDisptachToProps = dispatch => ({
  doSetUserId: userId => dispatch(doSetUserId(userId))
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(App);
