import React, { useEffect, useState } from "react";
import {
  getTeamMatches,
  getTeamMatchById,
} from "../../services/teamMatchService";
import Matches from "./Matches";

const MatchContainer = () => {
  const [matches, setMatches] = useState([]);

  const getAllTeamMatches = async () => {
    const response = await getTeamMatches();
    const data = response.data;
    setMatches(data);
  };

  useEffect(() => {
    getAllTeamMatches();
  }, []);

  const seasons = [...new Set(matches.map((match) => match.season))];
  return <Matches seasons={seasons} teamMatchData={matches} />;
};

export default MatchContainer;
