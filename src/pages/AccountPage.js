/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { doSignOut } from "../store/actions/authActions";
import Loader from "../components/extras/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithubAlt,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import "./AccountPage.scss";

const AccountPage = ({ signOut, auth, profile }) => {
  function handleLogout() {
    //sign return a promise on successfull signout
    signOut().finally(() => window.location.reload());
  }

  if (!auth.uid) return <Redirect to="/signin" />;

  if (profile.isLoaded) {
    return (
      <div className="accountpage">
        <div className="accountpage__about">
          {`Hi, ${profile.firstName}  ${profile.lastName}`}
          {auth.uid && <p>{auth.email}</p>}
        </div>
        <div className="accountpage__signout">
          {auth.uid && (
            <button className="accountpage__signout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign out
            </button>
          )}
        </div>
        {<AboutMe />}
      </div>
    );
  } else {
    return <Loader />;
  }
};

//About Me component with self links etc , I don't think it require additional js file, so I placed at bottom
const AboutMe = () => (
  <div className="accountpage__about-me">
    <div>Coded By Gopi Krishna</div>
    <div className="self-links">
      <a
        className="self-link twitter"
        href="https://twitter.com/_bgopikrishna"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        className="self-link linkedin"
        href="https://www.linkedin.com/in/bgopikrishna/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a
        className="self-link github"
        href="https://github.com/bgopikrishna"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
    </div>
    <div className="project-links">
      <span>
        <Link to="/credits">Credits</Link>
      </span>
      &nbsp; | &nbsp;
      <span>Under Development</span>
      &nbsp; | &nbsp;
      <span>
        <a
          href="https://github.com/bgopikrishna/moviebase"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </span>
    </div>
  </div>
);

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(doSignOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage);
