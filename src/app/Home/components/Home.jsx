import React, { useState, useEffect } from "react";
import HomeCarousel from "./HomeCarousel";
import Announcements from "./Announcements";
import WrestlingLogo from "../../HomePage/pictures/towson_wrestling_medium.jpg";
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
          <div className="tile">
            <h2 className="center-header">
              <b>Current Roster</b>
            </h2>
            <RosterTable data={wrestlerData} sortColumn="wrestler_name" />
          </div>
        </div>
        <div className="col-4">
          <div className="tile-img">
            <img
              src={WrestlingLogo}
              alt="Towson Wrestling Logo"
              className="home-img"
            />
          </div>
          <div className="tile">
            <h2 className="center-header">
              <b>Season Countdown</b>
            </h2>
            <SeasonCountdown />
          </div>
        </div>
        <div className="col-4">
          <div className="tile">
            <h2 className="center-header">
              <b>Announcements</b>
            </h2>
            <Announcements />
          </div>
          <div className="tile">
            <h2 className="center-header">
              <b>Recent Team Results</b>
            </h2>
            <MatchTable data={teamMatchData} sortColumn="match_date" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
