import React, { useState, useEffect } from "react";
import { getWrestlers } from "../../services/rosterService";
import { getTeamMatches } from "../../services/teamMatchService";
import Home from "./Home";

const HomeContainer = () => {
  const [wrestlers, setWrestlers] = useState([]);
  const [teamMatches, setTeamMatches] = useState([]);

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

  useEffect(() => {
    getRoster();
    getTeamMatchesAll();
  }, []);

  return (
    <>
      <Home wrestlerData={wrestlers} teamMatchData={teamMatches.slice(0, 5)} />
    </>
  );
};

export default HomeContainer;
