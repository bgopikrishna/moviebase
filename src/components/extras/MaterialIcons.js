import React from "react";
import PropTypes from "prop-types";

/*
  A collection of material icons in svg as components,
  currently only one icon(s) is present,
*/

/**
 * A watchlist icon component which is similar to youtube watchlist icon
 * It takes `added` {bool} as prop whick defaults to `false`
 */

export const WatchListAddIcon = ({ added }) => {
  if (added) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <path id="a" d="M0 0h24v24H0V0z" />
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path
          clipPath="url(#b)"
          d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
      </svg>
    );
  }
};

//Typechecking

WatchListAddIcon.propTypes = {
  added: PropTypes.bool
};

//Default Props
WatchListAddIcon.defaultProps = {
  added: false
};
