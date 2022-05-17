import "./App.css";
import Home from "./app/HomePage/components/Home";
import About from "./app/About/components/About";
import Seasons from "./app/Seasons/components/Seasons";
import SeasonPage from "./app/Seasons/components/SeasonPage";
import NavBar from "./app/NavBar/components/NavBar";
import Footer from "./app/Footer/components/Footer";
import Articles from "./app/Articles/components/Articles";
import Matches from "./app/Matches/components/Matches";
import Schools from "./app/Schools/components/Schools";
import NotFound from "./app/NotFound/components/NotFound";
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
        <Route path="/seasons/:season" exact component={SeasonPage} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/matches" exact component={Matches} />
        <Route path="/schools" exact component={Schools} />

        {/* This should be the last route; 404 - Not found */}
        <Route component={NotFound} />
      </Switch>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
