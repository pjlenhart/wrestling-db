import React, { Component, useState, useEffect } from "react";
import { getTeamMatches, getTeamMatchById } from "../services/teamMatchService";
import MatchTable from "./MatchTable";
import "../styles/matchStyles.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const getAllTeamMatches = async () => {
    const response = await getTeamMatches();
    const data = response.data;
    setMatches(data);
  };

  useEffect(() => {
    getAllTeamMatches();
  }, []);

  const columns = [
    {
      path: "opponent_school",
      label: "Opponent",
    },
    {
      path: "match_date_formatted",
      label: "Match Date",
    },
    {
      path: "team_score",
      label: "Team Score",
    },
    {
      path: "opponent_score",
      label: "Opponent Score",
    },
    {
      path: "team_result",
      label: "Result",
    },
  ];

  const seasons = [...new Set(matches.map((match) => match.season))];

  return (
    <div className="container">
      <h1 className="h1-match">Team Match Results</h1>
      {seasons.map((season) => {
        return (
          <>
            <h2>
              <b>Season {season}</b>
            </h2>
            <MatchTable
              data={matches.filter((match) => (match.season = season))}
              columns={columns}
              sortColumn="match_date"
            />
          </>
        );
      })}
    </div>
  );
};

export default Matches;
