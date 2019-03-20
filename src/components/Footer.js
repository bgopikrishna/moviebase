import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Coded By <a href="https://twitter.com/_bgopikrishna">Gopi Krishna</a>
      </span>
      &nbsp; | &nbsp;
      <span>
        Source Code{" "}
        <a
          href="https://github.com/bgopikrishna/moviebase"
          target="_blank"
          rel="noopener noreferrer"
        >
          Here
        </a>
      </span>
      &nbsp; | &nbsp;
      <span>Under Development</span>
    </footer>
  );
};

export default Footer;
