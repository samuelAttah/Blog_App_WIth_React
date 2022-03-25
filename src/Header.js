import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ title }) => {
  const activeStyle = { color: "red" };
  return (
    <header className="Header">
      <h1>{title}</h1>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Home
        </NavLink>
        {" | "}
        <NavLink
          to="/post"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Post
        </NavLink>
        {" | "}
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
