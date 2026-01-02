import React, { useState, useEffect } from 'react';
import {
    getRegularSeasonMatches,
    getIndividualMatches,
} from '../../services/matchService';
import SeasonPage from './SeasonPage';

const SeasonPageContainer = (props) => {
    const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
    const [individualMatches, setIndividualMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const season = props.match.params.season;

    const fetchSeasonData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [regularSeasonResponse, individualResponse] = await Promise.allSettled([
                getRegularSeasonMatches(),
                getIndividualMatches()
            ]);

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

        } catch (error) {
            console.error('Error fetching season data:', error);
            setError('Failed to load season data. Please try again later.');
            setRegularSeasonMatches([]);
            setIndividualMatches([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSeasonData();
    }, []);

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading season data...</div>;
    }

    if (error) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
        <SeasonPage
            regularSeasonData={regularSeasonMatches}
            individualData={individualMatches}
            season={season}
        />
    );
};

export default SeasonPageContainer;
