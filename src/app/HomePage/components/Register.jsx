import React from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="container">
      <h1 className="h-home">Registration Request</h1>
      <h2>
        Please fill out the below form to request registration to the system.
        You will be contacted if approved with further details.
      </h2>
      {/* <RegisterForm /> */}
      <p>
        To request access to this website please send an email to
        thswdb@gmail.com
      </p>
    </div>
  );
};

export default Register;
