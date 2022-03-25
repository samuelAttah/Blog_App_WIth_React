import React from "react";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="Nav">
      <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search"></label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Nav;
