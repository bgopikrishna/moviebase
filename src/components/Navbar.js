/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <header className="__logo">
        <h1>moviebase</h1>
      </header>
      <nav>
        <ul className="__navlinks">
          <li>
            <Link to="/" className="__navitem">
              <span role="img" aria-label="search">
                🏠
              </span>{" "}
              home
            </Link>
          </li>
          <li>
            <Link to="/" className="__navitem">
              <span role="img" aria-label="search">
                🔍
              </span>{" "}
              search
            </Link>
          </li>
          <li>
            <Link to="/404" className="__navitem">
              <span role="img" aria-label="search">
                🍿
              </span>{" "}
              mylist
            </Link>
          </li>
          <li>
            <Link to="/404" className="__navitem">
              <span role="img" aria-label="search">
                🤓
              </span>{" "}
              account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
