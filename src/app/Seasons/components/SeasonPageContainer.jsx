import React, { useState, useEffect } from "react";
import {
  getRegularSeasonMatches,
  getIndividualMatches,
} from "../../services/matchService";
import SeasonPage from "./SeasonPage";

const SeasonPageContainer = (props) => {
  const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
  const [individualMatches, setIndividualMatches] = useState([]);
  const season = props.match.params.season;

  const getRegularSeason = async () => {
    const response = await getRegularSeasonMatches();
    const data = response.data;
    setRegularSeasonMatches(data);
  };

  const getIndividual = async () => {
    const response = await getIndividualMatches();
    const data = response.data;
    setIndividualMatches(data);
  };

  useEffect(() => {
    getRegularSeason();
    getIndividual();
  }, []);

  const renderSeasonPage = () => {
    return regularSeasonMatches ? (
      <SeasonPage
        regularSeasonData={regularSeasonMatches}
        individualData={individualMatches}
        season={season}
      />
    ) : null;
  };

  return renderSeasonPage();
};

export default SeasonPageContainer;
