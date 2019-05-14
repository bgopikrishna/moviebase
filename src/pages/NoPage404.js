import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { doSignOut } from "../store/actions/authActions";

const NoPage404 = ({ signOut, auth }) => {
  return (
    <div style={{ margin: "100px auto", textAlign: "center" }}>
      Shhh... This page is not done yet <br />
      Go to{" "}
      <Link to="/" style={{ textDecoration: "underline" }}>
        Home
      </Link>
      <br />
      {auth.uid && <code>{auth.email}</code>}
      <br />
      {auth.uid && <button onClick={signOut}>Log Out</button>}
    </div>
  );
};

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    signOut: creds => dispatch(doSignOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoPage404);
