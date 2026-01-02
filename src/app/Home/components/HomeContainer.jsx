import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import Home from './Home';

const HomeContainer = () => {
    const [topPinners, setTopPinners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTopPinners = async () => {
        try {
            setIsLoading(true);
            const response = await getCareerStats();
            const data = response?.data || [];

            // Filter for 2025-2026 season and sort by pins (wins_by_pin)
            const currentSeasonData = data.filter(
                (record) => record.season === '2025-2026'
            );

            // Sort by pins in descending order and take top 5
            const sortedByPins = currentSeasonData
                .sort(
                    (a, b) => parseInt(b.wins_by_pin) - parseInt(a.wins_by_pin)
                )
                .slice(0, 5);

            setTopPinners(sortedByPins);
        } catch (error) {
            console.error('Error fetching top pinners:', error);
            setTopPinners([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTopPinners();
    }, []);

    return <Home topPinners={topPinners} isLoading={isLoading} />;
};

export default HomeContainer;
