import React, { useState, useEffect } from "react";
import auth from "../services/authService";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../NavBar/components/NavBar";

const AuthRoute = ({ path, component: Component, render, ...rest }) => {
  const [user, setUser] = useState("");

  const setMe = async () => {
    const { data } = await auth.getMe();
    setUser(data);
  };

  useEffect(() => {
    setMe();
  }, []);

  return (
    <React.Fragment>
      <NavBar user={user} />
      <Route
        {...rest}
        render={(props) => {
          if (!auth.getCurrentUser()) return <Redirect to="/login" />;
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    </React.Fragment>
  );
};

export default AuthRoute;
