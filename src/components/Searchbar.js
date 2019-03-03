import React from "react";

const Searchbar = ({ value, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="search"
        placeholder="🔍 search a movie by title"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">search</button>
    </form>
  );
};

export default Searchbar;
