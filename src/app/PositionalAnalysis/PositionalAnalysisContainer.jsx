import React, { useState, useEffect } from 'react';
import { getWrestlers } from '../services/rosterService';
import { getCareerStats } from '../services/statisticsService';
import { getRegularSeasonMatches, getIndividualMatches } from '../services/matchService';
import PositionalAnalysis from './PositionalAnalysis';

const PositionalAnalysisContainer = () => {
    const [wrestlers, setWrestlers] = useState([]);
    const [careerStats, setCareerStats] = useState([]);
    const [regularSeasonMatches, setRegularSeasonMatches] = useState([]);
    const [individualMatches, setIndividualMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch all data sources in parallel
            const [
                wrestlersResponse, 
                statsResponse,
                regularSeasonResponse,
                individualResponse
            ] = await Promise.all([
                getWrestlers(),
                getCareerStats(),
                getRegularSeasonMatches(),
                getIndividualMatches()
            ]);

            const wrestlersData = wrestlersResponse?.data || [];
            const statsData = statsResponse?.data || [];
            const regularSeasonData = regularSeasonResponse?.data || [];
            const individualData = individualResponse?.data || [];

            setWrestlers(wrestlersData);
            setCareerStats(statsData);
            setRegularSeasonMatches(regularSeasonData);
            setIndividualMatches(individualData);
        } catch (error) {
            console.error('Error fetching positional analysis data:', error);
            setError('Failed to load data. Please try again later.');
            setWrestlers([]);
            setCareerStats([]);
            setRegularSeasonMatches([]);
            setIndividualMatches([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Error Loading Data</h2>
                <p>{error}</p>
                <button onClick={fetchData}>Retry</button>
            </div>
        );
    }

    return (
        <PositionalAnalysis 
            wrestlers={wrestlers}
            careerStats={careerStats}
            regularSeasonMatches={regularSeasonMatches}
            individualMatches={individualMatches}
            isLoading={isLoading}
        />
    );
};

export default PositionalAnalysisContainer;
