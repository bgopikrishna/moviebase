import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const SignOutLinks = () => {
  return (
    <nav>
      <ul className="__navlinks">
        <li>
          <NavLink exact to="/signin" className="__navitem">
            <FontAwesomeIcon icon={faSignInAlt} />
            &nbsp;Sign In
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="__navitem">
            <FontAwesomeIcon icon={faUserPlus} />
            &nbsp;Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SignOutLinks;
