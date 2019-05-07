import React from "react";
import { Link } from "react-router-dom";

const WithLink = ({ to, externalLink, children }) => {
  if (externalLink) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link to={to}>{children}</Link>;
};

WithLink.defaultProps = {
  externalLink: false
};

export default WithLink;
