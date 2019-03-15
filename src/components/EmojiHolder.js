import React from "react";

const EmojiHolder = ({ emoji, label }) => {
  return (
    <span role="img" aria-label={label}>
      {emoji + " "}
    </span>
  );
};

export default EmojiHolder;
