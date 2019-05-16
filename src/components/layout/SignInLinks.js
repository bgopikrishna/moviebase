import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faSearch,
  faFilm,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";

const SignInLinks = () => {
  return (
    <nav>
      <ul className="__navlinks">
        <li>
          <NavLink exact to="/" className="__navitem">
            <FontAwesomeIcon icon={faFire} />
            &nbsp;trending
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="__navitem">
            <FontAwesomeIcon icon={faSearch} />
            &nbsp;search
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="__navitem">
            <FontAwesomeIcon icon={faFilm} />
            &nbsp;mylist
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className="__navitem">
            <FontAwesomeIcon icon={faUserAstronaut} />
            &nbsp;account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SignInLinks;
