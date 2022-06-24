import React from "react";
import WrestlingLogo from "../pictures/towson_wrestling_medium.jpg";
import "../styles/HomeStyles.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <div className="home-container-img">
        <img src={WrestlingLogo} className="title-img" alt="logo" />
      </div>
      <div className="home-container">
        <h1 className="title-name">Towson Wrestling DB</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
