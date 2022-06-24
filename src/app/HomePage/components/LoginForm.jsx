import React, { useState } from "react";
import auth from "../../services/authService";
import { Redirect, useHistory } from "react-router-dom";
import RegisterModal from "../../common/Modal/RegisterModal";
import "../styles/HomeStyles.css";

const LoginForm = (props) => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    await auth.login(username, password);
    if (auth.getCurrentUser()) history.push("/home");
  };

  const goToRegistration = () => {
    history.push("/register");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="labels">
          Username
        </label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label htmlFor="password" className="labels">
          Password
        </label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button className="register-button" onClick={goToRegistration}>
        Request Registration
      </button>
    </section>
  );
};

export default LoginForm;
