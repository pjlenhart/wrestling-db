import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBarStyles.css";

const NavBar = () => {
  const color = {
    background: "#800000",
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-app" style={color}>
      <div className="container-fluid nav-text">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav nav-text">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/seasons" className="nav-link">
              Seasons
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
