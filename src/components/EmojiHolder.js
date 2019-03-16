import React from "react";
import PropTypes from "prop-types";

//A Emoji holder for placing emoji's following web accessbility standards
//Passing emoji and its label as arguments
const EmojiHolder = ({ emoji, label }) => {
  return (
    <span role="img" aria-label={label}>
      {emoji + " "} {/*Ensuring the space after emoji  */}
    </span>
  );
};

export default EmojiHolder;

//Type checking
EmojiHolder.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
