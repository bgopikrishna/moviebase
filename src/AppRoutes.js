import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";
import MovieInfoPage from "./pages/MovieInfoPage";
import MovieListPage from "./pages/MovieListPage";
import TrendingPage from "./pages/TrendingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountPage from "./pages/AccountPage";
import CreditsPage from "./pages/CreditsPage";
import ForgotPassPage from "./pages/ForgotPassPage";



function AppRoutes() {
  return <Switch>

    <Route exact path="/" component={TrendingPage} />
    <Route path="/home" component={TrendingPage} />
    <Route path="/trending" component={TrendingPage} />


    <Route exact path="/search" component={SearchPage} />


    <Route path="/list" component={MovieListPage} />


    <Route path="/account" component={AccountPage} />


    <Route exact path="/movie/:movie_Id" component={MovieInfoPage} />


    <Route path="/cast/:id" component={props => {
      window.location = `https://www.themoviedb.org/person/${props.match.params.id}`;
      return null;
    }} />

    <Route path="/signin" component={SignIn} />


    <Route path="/signup" component={SignUp} />


    <Route path="/forgotpassword" component={ForgotPassPage} />


    <Route path="/credits" component={CreditsPage} />


    <Route component={NoPage404} />
  </Switch>;
}


export default AppRoutes