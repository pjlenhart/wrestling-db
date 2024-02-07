import React, { useState, useEffect } from 'react';
import {
    getRegularSeasonMatchByWrestler,
    getIndividualMatchByWrestler,
} from '../../services/matchService';
import { getWrestlerById } from '../../services/rosterService';
import { getCareerStatsByWrestler } from '../../services/statisticsService';
import WrestlerPage from './WrestlerPage';

const WrestlerPageContainer = (props) => {
    const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
    const [individualMatches, setIndividualMatches] = useState([]);
    const [wrestlerInfo, setWrestlerInfo] = useState([]);
    const [careerStats, setCareerStats] = useState([]);

    const getRegularSeason = async () => {
        const response = await getRegularSeasonMatchByWrestler(
            props.match.params.id
        );
        const data = response.data?.data;
        setRegularSeasonMatches(data);
    };

    const getIndividual = async () => {
        const response = await getIndividualMatchByWrestler(
            props.match.params.id
        );
        const data = response.data?.data;
        setIndividualMatches(data);
    };

    const getWrestlerInfo = async () => {
        const response = await getWrestlerById(props.match.params.id);
        const data = response.data.data[0];
        setWrestlerInfo(data);
    };

    const getStatistics = async () => {
        const response = await getCareerStatsByWrestler(props.match.params.id);
        const data = response.data?.data;
        setCareerStats(data);
    };

    useEffect(() => {
        getRegularSeason();
        getIndividual();
        getWrestlerInfo();
        getStatistics();
    }, []);

    return (
        <>
            {regularSeasonMatches ? (
                <WrestlerPage
                    regularSeasonData={regularSeasonMatches}
                    individualData={individualMatches}
                    wrestlerData={wrestlerInfo}
                    careerStats={careerStats}
                />
            ) : null}
        </>
    );
};

export default WrestlerPageContainer;
