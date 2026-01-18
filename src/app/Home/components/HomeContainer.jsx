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
                    (a, b) => parseInt(b.wins_by_tech_fall) - parseInt(a.wins_by_tech_fall)
                )
                .slice(0, 5);
            setTopTechFalls(sortedByTechFalls);

            // Best Records All Time - Group by wrestler and sum up total wins across all seasons
            const wrestlerCareerRecords = {};
            data.forEach((record) => {
                const wrestlerId = record.wrestler_id;
                if (!wrestlerCareerRecords[wrestlerId]) {
                    wrestlerCareerRecords[wrestlerId] = {
                        wrestler_id: wrestlerId,
                        wrestler_name: record.wrestler_name,
                        total_wins: 0,
                        total_losses: 0,
                    };
                }
                wrestlerCareerRecords[wrestlerId].total_wins += parseInt(record.wins) || 0;
                wrestlerCareerRecords[wrestlerId].total_losses += parseInt(record.losses) || 0;
            });

            // Convert to array and sort by total wins
            const sortedByCareerWins = Object.values(wrestlerCareerRecords)
                .sort((a, b) => b.total_wins - a.total_wins)
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
