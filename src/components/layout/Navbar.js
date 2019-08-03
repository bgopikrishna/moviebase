/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navbar.scss";
import { connect } from "react-redux";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";

/**
 * Navbar component which takes `auth`{object} as prop
 * to determine which links to, show based on whether user signed in or not
 */

const Navbar = ({ auth }) => {
  const links = auth.uid ? <SignInLinks /> : <SignOutLinks />;
  return (
    <div className="navbar">
      <header className="__logo">
        <h1>
          <a href="/">moviebase</a>
        </h1>
      </header>

      {links}
    </div>
  );
};

//Mapping auth State to the props from the redux store
const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth
  };
};

const ehanceWithStore = connect(
  mapStateToProps,
  null, // Rest of the params are passed due to a bug when using react router and react-redux
  null,
  { pure: false }
);
//

//enhancing the component with the store
export default ehanceWithStore(Navbar);
