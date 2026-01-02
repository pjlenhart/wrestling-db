import React, { useEffect, useState } from 'react';
import { getTeamMatches } from '../../services/teamMatchService';
import Matches from './Matches';

const MatchContainer = () => {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllTeamMatches = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getTeamMatches();
            const data = response?.data || [];
            setMatches(data);
        } catch (error) {
            console.error('Error fetching team matches:', error);
            setError('Failed to load team matches. Please try again later.');
            setMatches([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllTeamMatches();
    }, []);

    const seasons = [...new Set(matches.map((match) => match.season))];
    const seasonList = seasons.filter((season) => season !== 'N/A');
    const teamMatchList = matches.filter((match) => match.team_match_id !== 24);
    return <Matches seasons={seasonList} teamMatchData={teamMatchList} isLoading={isLoading} error={error} />;
};

export default MatchContainer;
