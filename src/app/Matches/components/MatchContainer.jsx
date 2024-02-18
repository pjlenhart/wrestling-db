import React, { useEffect, useState } from 'react';
import { getTeamMatches } from '../../services/teamMatchService';
import Matches from './Matches';

const MatchContainer = () => {
    const [matches, setMatches] = useState([]);

    const getAllTeamMatches = async () => {
        const response = await getTeamMatches();
        const data = response.data?.data;
        setMatches(data);
    };

    useEffect(() => {
        getAllTeamMatches();
    }, []);

    const seasons = [...new Set(matches.map((match) => match.season))];
    const seasonList = seasons.filter((season) => season !== 'N/A');
    const teamMatchList = matches.filter((match) => match.team_match_id !== 24);
    return <Matches seasons={seasonList} teamMatchData={teamMatchList} />;
};

export default MatchContainer;
