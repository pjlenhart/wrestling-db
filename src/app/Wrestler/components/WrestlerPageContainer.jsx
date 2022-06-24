import React, { useState, useEffect } from "react";
import {
  getRegularSeasonMatchByWrestler,
  getIndividualMatchByWrestler,
} from "../../services/matchService";
import { getWrestlerById } from "../../services/rosterService";
import WrestlerPage from "./WrestlerPage";

const WrestlerPageContainer = (props) => {
  const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
  const [individualMatches, setIndividualMatches] = useState([]);
  const [wrestlerInfo, setWrestlerInfo] = useState([]);

  const getRegularSeason = async () => {
    const response = await getRegularSeasonMatchByWrestler(
      props.match.params.id
    );
    const data = response.data;
    setRegularSeasonMatches(data);
  };

  const getIndividual = async () => {
    const response = await getIndividualMatchByWrestler(props.match.params.id);
    const data = response.data;
    setIndividualMatches(data);
  };

  const getWrestlerInfo = async () => {
    const response = await getWrestlerById(props.match.params.id);
    const data = response.data;
    setWrestlerInfo(data);
  };

  useEffect(() => {
    getRegularSeason();
    getIndividual();
    getWrestlerInfo();
  }, []);

  return (
    <>
      {regularSeasonMatches ? (
        <WrestlerPage
          regularSeasonData={regularSeasonMatches}
          individualData={individualMatches}
          wrestlerData={wrestlerInfo}
        />
      ) : null}
    </>
  );
};

export default WrestlerPageContainer;
