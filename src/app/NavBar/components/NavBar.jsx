import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBarStyles.css";

const NavBar = () => {
  const color = {
    background: "#800000",
  };

  const pages = ["Home", "About", "Seasons", "Matches", "Articles"];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-app" style={color}>
      <div className="container-fluid nav-text">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav nav-text">
            {pages.map((page) => (
              <NavLink
                to={`/${page.toLowerCase()}`}
                className="nav-link"
                exact={true}
              >
                {page}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
