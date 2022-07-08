import React from "react";
import WrestlerPageTable from "./WrestlerPageTable";
import "../styles/wrestlerStyles.css";

const WrestlerPage = (props) => {
  const { regularSeasonData, individualData, wrestlerData } = props;
  const wrestlerName = wrestlerData ? wrestlerData.wrestler_name : null;

  const calculateRecord = () => {
    const regSeason = [...regularSeasonData];
    const individual = [...individualData];
    const regSeasonWins = regSeason.filter(
      (match) => match.match_result === "Win"
    );
    const individualWins = individual.filter(
      (match) => match.match_result === "Win"
    );
    const wins = regSeasonWins.length + individualWins.length;
    const regSeasonLosses = regSeason.filter(
      (match) => match.match_result === "Loss"
    );
    const individualLosses = individual.filter(
      (match) => match.match_result === "Loss"
    );
    const losses = regSeasonLosses.length + individualLosses.length;
    return `${wins} - ${losses}`;
  };

  return regularSeasonData ? (
    <div className="container-fluid">
      <h1 className="h-home">{wrestlerName}</h1>
      <div className="row">
        <div className="col-8">
          <h2>Regular Season - Career</h2>
          <WrestlerPageTable data={regularSeasonData} type="regularSeason" />
          <br />
          <br />
          <h2>Individual/Postseason - Career</h2>
          <WrestlerPageTable data={individualData} type="individual" />
        </div>
        <div className="col-4">
          <h2>Wrestler Statistics</h2>
          {calculateRecord()}
        </div>
      </div>
    </div>
  ) : null;
};

export default WrestlerPage;
