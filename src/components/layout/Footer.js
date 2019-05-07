/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Made with  &nbsp;<span style={{ color: "#D1452B" }}>❤️</span> &nbsp; and &nbsp;
        <span style={{ color: "#61DAFB" }}>⚛️</span>
      </span>
      &nbsp; | &nbsp;
      <span>
        Coded By <a href="https://twitter.com/_bgopikrishna">Gopi Krishna</a>
      </span>
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
      &nbsp; | &nbsp;
      <span>Under Development</span>
    </footer>
  );
};

export default Footer;
