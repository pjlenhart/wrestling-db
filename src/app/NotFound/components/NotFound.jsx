import React from "react";
import { Link } from "react-router-dom";
import "../styles/404Styles.css";

const NotFound = () => {
  return (
    <div className="container">
      <div className="error-404">404</div>
      <p className="p-404">The page you are looking for does not exist.</p>
      <p className="p-404">
        Check the URL for typos or return to the <Link to="/">homepage.</Link>
      </p>
      <p className="p-404">
        Any further issues please contact the site admin via email at{" "}
        <a href="mailto:thswdb@gmail.com">thswdb@gmail.com</a>
      </p>
    </div>
  );
};

export default NotFound;
