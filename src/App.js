import "./App.css";
import HomeContainer from "./app/Home/components/HomeContainer";
import Login from "./app/HomePage/components/Login";
import About from "./app/About/components/About";
import Seasons from "./app/Seasons/components/Seasons";
import SeasonPageContainer from "./app/Seasons/components/SeasonPageContainer";
import RecordsContainer from "./app/Records/components/RecordsContainer";
import WrestlerContainer from "./app/Wrestler/components/WrestlerContainer";
import WrestlerPageContainer from "./app/Wrestler/components/WrestlerPageContainer";
import Staff from "./app/Staff/components/Staff";
import AuthRoute from "./app/Routing/AuthRoute";
//import Footer from "./app/Footer/components/Footer";
import Articles from "./app/Articles/components/Articles";
import MatchContainer from "./app/Matches/components/MatchContainer";
import SchoolContainer from "./app/Schools/components/SchoolContainer";
import NotFound from "./app/NotFound/components/NotFound";
import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import Register from "./app/HomePage/components/Register";

function App() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <AuthRoute path="/" exact component={HomeContainer} />
      <AuthRoute path="/home" exact component={HomeContainer} />
      <AuthRoute path="/about" exact component={About} />
      <AuthRoute path="/seasons" exact component={Seasons} />
      <AuthRoute
        path="/seasons/:season"
        exact
        component={SeasonPageContainer}
      />
      <AuthRoute path="/articles" exact component={Articles} />
      <AuthRoute path="/matches" exact component={MatchContainer} />
      <AuthRoute path="/schools" exact component={SchoolContainer} />
      <AuthRoute path="/records" exact component={RecordsContainer} />
      <AuthRoute path="/staff" exact component={Staff} />
      <AuthRoute path="/wrestlers" exact component={WrestlerContainer} />
      <AuthRoute
        path="/wrestlers/:id"
        exact
        component={WrestlerPageContainer}
      />

      {/* This should be the last route; 404 - Not found */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
