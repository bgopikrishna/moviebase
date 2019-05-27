import React from "react";
import PropTypes from "prop-types";

/**
 * A Emoji holder for placing emoji's following web accessbility standards
 * we pass `emoji` {string} and its `label` {string} as props
 */

const EmojiHolder = ({ emoji, label }) => {
  return (
    <span role="img" aria-label={label}>
      {emoji} &nbsp; {/*Ensuring the space after emoji  */}
    </span>
  );
};

export default EmojiHolder;

//Type checking using Proptypes
EmojiHolder.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
