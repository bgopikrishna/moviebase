/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navbar.scss";
import { connect } from "react-redux";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";

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

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Navbar);
