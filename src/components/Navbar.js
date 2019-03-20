/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

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
              <i className="fas fa-fire" /> Trending
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="__navitem">
              <i className="fas fa-search" /> search
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" className="__navitem">
              <i className="fas fa-film" /> mylist
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className="__navitem">
              <i className="fas fa-user-astronaut" /> account
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
