import React, { useContext } from "react";
import { Link } from "react-router";
import { DataContext } from "../Context/DataContext";

const Navbar = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className="Nav">
      <form
        action=""
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          id="search"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
