import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import Home from './Home';

const HomeContainer = () => {
    const [topPinners, setTopPinners] = useState([]);
    const [topTechFalls, setTopTechFalls] = useState([]);
    const [bestRecords, setBestRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getLeaderboardData = async () => {
        try {
            setIsLoading(true);
            const response = await getCareerStats();
            const data = response?.data || [];

            // Filter for 2025-2026 season
            const currentSeasonData = data.filter(
                (record) => record.season === '2025-2026'
            );

            // Top Pinners - Sort by pins in descending order and take top 5
            const sortedByPins = currentSeasonData
                .sort(
                    (a, b) => parseInt(b.wins_by_pin) - parseInt(a.wins_by_pin)
                )
                .slice(0, 5);
            setTopPinners(sortedByPins);

            // Top Tech Falls - Sort by tech falls in descending order and take top 5
            const sortedByTechFalls = currentSeasonData
                .sort(
                    (a, b) =>
                        parseInt(b.wins_by_tech_fall) -
                        parseInt(a.wins_by_tech_fall)
                )
                .slice(0, 5);
            setTopTechFalls(sortedByTechFalls);

            // Best Records All Time - Filter for career stats and sort by wins
            const careerData = data.filter(
                (record) => record.season === 'Career'
            );

            const sortedByCareerWins = careerData
                .sort((a, b) => parseInt(b.wins) - parseInt(a.wins))
                .slice(0, 5);
            setBestRecords(sortedByCareerWins);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setTopPinners([]);
            setTopTechFalls([]);
            setBestRecords([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLeaderboardData();
    }, []);

    return (
        <Home
            topPinners={topPinners}
            topTechFalls={topTechFalls}
            bestRecords={bestRecords}
            isLoading={isLoading}
        />
    );
};

export default HomeContainer;
