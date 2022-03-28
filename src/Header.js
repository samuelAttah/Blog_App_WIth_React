import React from "react";
import { NavLink } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

const Header = ({ title, width }) => {
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
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
