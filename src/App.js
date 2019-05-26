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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOnline: true
    };
  }
  //TODO: Work On MovieInfo page & List Page
  componentDidMount() {
    //Checking internet connection for the user
    if (this.props.uid) {
      const userId = this.props.uid;
      this.props.doSetUserId(userId);
    }
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

                {/**Password Forget Page */}
                <Route path="/forgotpassword" component={ForgotPassPage} />

                {/**credots  Page */}
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
