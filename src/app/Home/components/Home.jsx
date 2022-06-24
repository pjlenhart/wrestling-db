import React, { useState, useEffect } from "react";
import HomeCarousel from "./HomeCarousel";
import RosterTable from "./RosterTable";
import MatchTable from "../../Matches/components/MatchTable";
import SeasonCountdown from "./SeasonCountdown";
import "../styles/homeStyles.css";

const Home = (props) => {
  const { wrestlerData, teamMatchData } = props;

  return (
    <div className="container-fluid">
      <h1 className="h-home">Towson Wrestling Home</h1>
      <div className="row div-top">
        <div className="col-4">
          <h2>
            <b>Current Roster</b>
          </h2>
          <RosterTable data={wrestlerData} sortColumn="wrestler_name" />
        </div>
        <div className="col-4">
          <h2>
            <b>Photo Gallery</b>
          </h2>
          <HomeCarousel />
          <h2>
            <b>Season Countdown</b>
          </h2>
          <SeasonCountdown />
        </div>
        <div className="col-4">
          <h2>
            <b>Recent Team Results</b>
          </h2>
          <MatchTable data={teamMatchData} sortColumn="match_date" />
        </div>
      </div>
    </div>
  );
};

export default Home;
