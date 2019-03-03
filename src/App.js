import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/Searchpage";
import NoPage404 from "./pages/NoPage404";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/404" component={NoPage404} />

        </Switch>
      </div>
    );
  }
}

export default App;
