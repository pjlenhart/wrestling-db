import React, { useState, useEffect } from "react";
import { getWrestlers } from "../../services/rosterService";
import { getTeamMatches } from "../../services/teamMatchService";
import { getAnnouncements } from "../../services/widgetService";
import Home from "./Home";

const HomeContainer = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [teamMatches, setTeamMatches] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const getRoster = async () => {
    const response = await getWrestlers();
    const data = response.data;
    const activeData = data.filter((item) => item.active_roster === true);
    setWrestlers(activeData);
  };

  const getTeamMatchesAll = async () => {
    const response = await getTeamMatches("desc");
    const data = response.data;
    setTeamMatches(data);
  };

  const getCurrentAnnoucements = async () => {
    const response = await getAnnouncements();
    const data = response.data;
    const today = new Date().toISOString().slice(0, 10);
    const currentAnnoucements = data.filter(
      (ann) => ann.expiration_date > today
    );
    setAnnouncements(currentAnnoucements);
  };

  useEffect(() => {
    getRoster();
    getTeamMatchesAll();
    getCurrentAnnoucements();
  }, []);

  return (
    <>
      <Home
        wrestlerData={wrestlers}
        teamMatchData={teamMatches.slice(0, 5)}
        announcements={announcements}
      />
    </>
  );
};

export default HomeContainer;
