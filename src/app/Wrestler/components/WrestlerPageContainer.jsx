import React, { useState, useEffect } from 'react';
import {
    getRegularSeasonMatchByWrestler,
    getIndividualMatchByWrestler,
} from '../../services/matchService';
import { getWrestlerById } from '../../services/rosterService';
import { getCareerStatsByWrestler } from '../../services/statisticsService';
import WrestlerPage from './WrestlerPage';
import { getAccoladesByWrestler } from '../../services/widgetService';

const WrestlerPageContainer = (props) => {
    const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
    const [individualMatches, setIndividualMatches] = useState([]);
    const [wrestlerInfo, setWrestlerInfo] = useState([]);
    const [careerStats, setCareerStats] = useState([]);
    const [accolades, setAccolades] = useState([]);

    const getRegularSeason = async () => {
        const response = await getRegularSeasonMatchByWrestler(
            props.match.params.id
        );
        const data = response?.data;
        setRegularSeasonMatches(data);
    };

    const getIndividual = async () => {
        const response = await getIndividualMatchByWrestler(
            props.match.params.id
        );
        const data = response?.data;
        setIndividualMatches(data);
    };

    const getWrestlerInfo = async () => {
        const response = await getWrestlerById(props.match.params.id);
        const data = response?.data[0];
        setWrestlerInfo(data);
    };

    const getStatistics = async () => {
        const response = await getCareerStatsByWrestler(props.match.params.id);
        const data = response?.data;
        setCareerStats(data);
    };

    const getAwards = async () => {
        const response = await getAccoladesByWrestler(props.match.params.id);
        const data = response?.data;
        setAccolades(data);
    };

    useEffect(() => {
        getRegularSeason();
        getIndividual();
        getWrestlerInfo();
        getStatistics();
        getAwards();
    }, []);

    return (
        <>
            {regularSeasonMatches ? (
                <WrestlerPage
                    regularSeasonData={regularSeasonMatches}
                    individualData={individualMatches}
                    wrestlerData={wrestlerInfo}
                    careerStats={careerStats}
                    accolades={accolades}
                />
            ) : null}
        </>
    );
};

export default WrestlerPageContainer;
