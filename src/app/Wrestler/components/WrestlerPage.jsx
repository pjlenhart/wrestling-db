import React from "react";
import WrestlerPageTable from "./WrestlerPageTable";
import WrestlerStatBox from "./WrestlerStatBox";
import "../styles/wrestlerStyles.css";

const WrestlerPage = (props) => {
  const { regularSeasonData, individualData, wrestlerData, careerStats } =
    props;
  const wrestlerName = wrestlerData ? wrestlerData.wrestler_name : null;
  const careerArr = careerStats.filter((stats) => stats.season === "Career");
  const career = careerArr[0] ? careerArr[0] : null;

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
          <WrestlerStatBox data={career} />
        </div>
      </div>
      {/* make this a full width div (container-fluid) and then a tabbed interface with different tabs comparing season over season performance for certain stats
      the season over season should be a multi-line line graph where each line is a different season. Then create tabs for each stat. For example, wins season by season, 
      reversals, points scored, matches total, etc */}
    </div>
  ) : null;
};

export default WrestlerPage;
