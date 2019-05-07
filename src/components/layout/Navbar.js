/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faSearch,
  faFilm,
  faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar">
      <header className="__logo">
        <h1>
          <a href="/">moviebase</a>
        </h1>
      </header>
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
    </div>
  );
};

export default Navbar;
