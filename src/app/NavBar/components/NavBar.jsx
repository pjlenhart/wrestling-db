import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/NavBarStyles.css";

const NavBar = () => {
  const color = {
    background: "#800000",
  };

  const pages = [
    { link: "home", display: "Home" },
    { link: "about", display: "About" },
    { link: "seasons", display: "Seasons" },
    { link: "matches", display: "Team Matches" },
    { link: "articles", display: "Articles" },
    { link: "schools", display: "School Directory" },
    { link: "staff", display: "Coaching Staff" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-app" style={color}>
      <div className="container-fluid nav-text">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav nav-text">
            {pages.map((page) => (
              <NavLink to={`/${page.link}`} className="nav-link" exact={true}>
                {page.display}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
