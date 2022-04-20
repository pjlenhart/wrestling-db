import "./App.css";
import Home from "./app/HomePage/components/Home";
import About from "./app/About/components/About";
import Seasons from "./app/Seasons/components/Seasons";
import NavBar from "./app/NavBar/components/NavBar";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/seasons" exact component={Seasons} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
