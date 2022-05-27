import React from "react";
import WrestlingLogo from "../pictures/towson_wrestling_medium.jpg";
import "../styles/HomeStyles.css";

const Login = () => {
  return (
    <div>
      <div className="home-container-img">
        <img src={WrestlingLogo} className="title-img" alt="logo" />
      </div>
      <div className="home-container">
        <h1 className="title-name">Towson Wrestling DB</h1>
        <form>
          <div className="home-container">
            <label for="username" className="labels">
              Username
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
            </div>
            <label for="password" className="labels">
              Password
            </label>
            <div>
              <input
                type="text"
                placeholder="Enter Password"
                name="password"
                required
              />
            </div>
          </div>
          <button type="submit" className="home-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
