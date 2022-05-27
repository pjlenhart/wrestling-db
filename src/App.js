import "./App.css";
import HomeContainer from "./app/Home/components/HomeContainer";
import Login from "./app/HomePage/components/Login";
import About from "./app/About/components/About";
import Seasons from "./app/Seasons/components/Seasons";
import SeasonPage from "./app/Seasons/components/SeasonPage";
import NavBar from "./app/NavBar/components/NavBar";
import Footer from "./app/Footer/components/Footer";
import Articles from "./app/Articles/components/Articles";
import MatchContainer from "./app/Matches/components/MatchContainer";
import Schools from "./app/Schools/components/Schools";
import NotFound from "./app/NotFound/components/NotFound";
import { Route, Switch } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/home" exact component={HomeContainer} />
        <Route path="/login" exact component={Login} />
        <Route path="/about" exact component={About} />
        <Route path="/seasons" exact component={Seasons} />
        <Route path="/seasons/:season" exact component={SeasonPage} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/matches" exact component={MatchContainer} />
        <Route path="/schools" exact component={Schools} />

        {/* This should be the last route; 404 - Not found */}
        <Route component={NotFound} />
      </Switch>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
