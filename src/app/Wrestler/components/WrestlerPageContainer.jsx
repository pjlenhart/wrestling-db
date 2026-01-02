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
    const [wrestlerInfo, setWrestlerInfo] = useState(null);
    const [careerStats, setCareerStats] = useState([]);
    const [accolades, setAccolades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Fetch all data in parallel
            const [
                regularSeasonResponse,
                individualResponse,
                wrestlerResponse,
                statsResponse,
                accoladesResponse
            ] = await Promise.allSettled([
                getRegularSeasonMatchByWrestler(props.match.params.id),
                getIndividualMatchByWrestler(props.match.params.id),
                getWrestlerById(props.match.params.id),
                getCareerStatsByWrestler(props.match.params.id),
                getAccoladesByWrestler(props.match.params.id)
            ]);

            // Handle each response with fallbacks
            if (regularSeasonResponse.status === 'fulfilled') {
                setRegularSeasonMatches(regularSeasonResponse.value?.data || []);
            } else {
                console.error('Error fetching regular season matches:', regularSeasonResponse.reason);
                setRegularSeasonMatches([]);
            }

            if (individualResponse.status === 'fulfilled') {
                setIndividualMatches(individualResponse.value?.data || []);
            } else {
                console.error('Error fetching individual matches:', individualResponse.reason);
                setIndividualMatches([]);
            }

            if (wrestlerResponse.status === 'fulfilled') {
                setWrestlerInfo(wrestlerResponse.value?.data?.[0] || null);
            } else {
                console.error('Error fetching wrestler info:', wrestlerResponse.reason);
                setWrestlerInfo(null);
            }

            if (statsResponse.status === 'fulfilled') {
                setCareerStats(statsResponse.value?.data || []);
            } else {
                console.error('Error fetching career stats:', statsResponse.reason);
                setCareerStats([]);
            }

            if (accoladesResponse.status === 'fulfilled') {
                setAccolades(accoladesResponse.value?.data || []);
            } else {
                console.error('Error fetching accolades:', accoladesResponse.reason);
                setAccolades([]);
            }

        } catch (error) {
            console.error('Error fetching wrestler data:', error);
            setError('Failed to load wrestler data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [props.match.params.id]);

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading wrestler data...</div>;
    }

    if (error) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    if (!wrestlerInfo) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Wrestler not found.</div>;
    }

    return (
        <WrestlerPage
            regularSeasonData={regularSeasonMatches}
            individualData={individualMatches}
            wrestlerData={wrestlerInfo}
            careerStats={careerStats}
            accolades={accolades}
        />
    );
};

export default WrestlerPageContainer;
