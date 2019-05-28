import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * `WithLink` is component which returns either anchor tag or React-Router Link Component based on the props
 * Porps are
 * `to` {string} is the link
 * `externalLink` {bool} is used for to return anchor tag or Link component
 * `children`
 * @param {*} param0
 */

const WithLink = ({ to, externalLink, children }) => {
  //Return if it's an external link
  if (externalLink) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link to={to}>{children}</Link>;
};

//Default props
WithLink.defaultProps = {
  externalLink: false
};

//Type checking
WithLink.propTypes = {
  to: PropTypes.string.isRequired,
  externalLink: PropTypes.bool.isRequired
};

export default WithLink;
