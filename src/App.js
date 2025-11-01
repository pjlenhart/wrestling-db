import './App.css';
import HomeContainer from './app/Home/components/HomeContainer';
import About from './app/About/components/About';
import Seasons from './app/Seasons/components/Seasons';
import SeasonPageContainer from './app/Seasons/components/SeasonPageContainer';
import RecordsContainer from './app/Records/components/RecordsContainer';
import WrestlerContainer from './app/Wrestler/components/WrestlerContainer';
import WrestlerPageContainer from './app/Wrestler/components/WrestlerPageContainer';
import Staff from './app/Staff/components/Staff';
import MatchContainer from './app/Matches/components/MatchContainer';
import SchoolContainer from './app/Schools/components/SchoolContainer';
import NotFound from './app/NotFound/components/NotFound';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import NavBar from './app/NavBar/components/NavBar';
import MoveSearchContainer from './app/MoveSearch/MoveSearchContainer';

function App() {
    return (
        <>
            <div className="nav-space">
                <NavBar />
            </div>
            <Switch>
                <Route path="/" exact component={HomeContainer} />
                <Route path="/home" exact component={HomeContainer} />
                <Route path="/about" exact component={About} />
                <Route path="/seasons" exact component={Seasons} />
                <Route
                    path="/seasons/:season"
                    exact
                    component={SeasonPageContainer}
                />
                <Route path="/matches" exact component={MatchContainer} />
                <Route path="/schools" exact component={SchoolContainer} />
                <Route path="/records" exact component={RecordsContainer} />
                <Route
                    path="/moveSearch"
                    exact
                    component={MoveSearchContainer}
                />
                <Route path="/staff" exact component={Staff} />
                <Route path="/wrestlers" exact component={WrestlerContainer} />
                <Route
                    path="/wrestlers/:id"
                    exact
                    component={WrestlerPageContainer}
                />

                {/* This should be the last route; 404 - Not found */}
                <Route component={NotFound} />
            </Switch>
        </>
    );
}

export default App;
