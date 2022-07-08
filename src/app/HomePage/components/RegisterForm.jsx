import React from "react";
import { Redirect, useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();

  const cancelRegistration = () => {
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const resp = {
      fistName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };
    console.log(resp);
    history.push("/login");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="labels">
          First Name
        </label>
        <input type="text" id="firstName" placeholder="Enter First Name" />
        <label htmlFor="lastName" className="labels">
          Last Name
        </label>
        <input type="text" id="lastName" placeholder="Enter Last Name" />
        <label htmlFor="email" className="labels">
          Email Address
        </label>
        <input type="text" id="email" placeholder="Enter Email" />
        <label htmlFor="message" className="labels">
          Message
        </label>
        <input type="text" id="message" placeholder="Enter Message for Admin" />
        <button type="submit" className="login-button">
          Send Request
        </button>
      </form>
      <button className="register-button" onClick={cancelRegistration}>
        Cancel Request
      </button>
    </section>
  );
};

export default RegisterForm;
