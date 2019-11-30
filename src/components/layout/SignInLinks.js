import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faSearch,
  faFilm,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";

/**
 * Links to show when user signed in
 */

const SignInLinks = () => {
  return (
    <nav>
      <ul className="__navlinks">
        <li>
          <NavLink exact to="/" className="__navitem" title="Trending">
            <FontAwesomeIcon icon={faFire} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="__navitem" title="Search">
            <FontAwesomeIcon icon={faSearch} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="__navitem" title="Library">
            <FontAwesomeIcon icon={faFilm} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className="__navitem" title="Account">
            <FontAwesomeIcon icon={faUserAstronaut} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SignInLinks;
