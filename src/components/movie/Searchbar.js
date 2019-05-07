import React from "react";
import PropTypes from "prop-types";

// A searchbar comp for managing searches

const Searchbar = ({ value, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="search"
        placeholder="🔍 search a movie by title"
        value={value}
        onChange={handleChange}
        aria-label="search"
        required
      />
      <button type="submit">search</button>
    </form>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
};
