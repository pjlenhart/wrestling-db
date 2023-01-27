import React from "react";
import auth from "../../services/authService";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/NavBarStyles.css";

const NavBar = (props) => {
  const { user } = props;
  const color = {
    background: "#800000",
  };

  const history = useHistory();

  const pages = [
    { link: "home", display: "Home" },
    { link: "about", display: "About" },
    { link: "seasons", display: "Seasons" },
    { link: "matches", display: "Team Matches" },
    { link: "wrestlers", display: "Wrestlers" },
    { link: "records", display: "Records" },
    { link: "schools", display: "School Directory" },
    { link: "staff", display: "Coaching Staff" },
  ];

  const handleLogout = () => {
    auth.logout();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-app" style={color}>
      <div className="container-fluid nav-text">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav nav-text">
            {pages.map((page) => (
              <NavLink
                to={`/${page.link}`}
                className="nav-link"
                exact={true}
                key={page.link}
              >
                {page.display}
              </NavLink>
            ))}
          </div>
        </div>
        <span style={{ color: "white" }} className="hello-text">
          Hello, {user.first_name}
        </span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
