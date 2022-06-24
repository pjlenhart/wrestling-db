import React, { Component } from "react";
import SeasonTable from "./SeasonTable";

const SeasonPage = (props) => {
  const { season, individualData, regularSeasonData } = props;

  const individualDataFiltered =
    season === "all"
      ? individualData
      : individualData.filter((match) => match.season === season);
  const regularSeasonDataFiltered =
    season === "all"
      ? regularSeasonData
      : regularSeasonData.filter((match) => match.season === season);

  return (
    <div className="container-fluid">
      <h2>Regular Season Matches - {season === "all" ? "All Time" : season}</h2>
      <SeasonTable data={regularSeasonDataFiltered} type="regularSeason" />
      <h2>
        Individual/Postseason Matches - {season === "all" ? "All Time" : season}
      </h2>
      <SeasonTable data={individualDataFiltered} type="individual" />
    </div>
  );
};

export default SeasonPage;
