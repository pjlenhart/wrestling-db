import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import { getEvents } from '../../services/widgetService';
import { seasonStartYear } from '../calendar';
import Home from './Home';

const HomeContainer = () => {
    const [topPinners, setTopPinners] = useState([]);
    const [topTechFalls, setTopTechFalls] = useState([]);
    const [bestRecords, setBestRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [season] = useState(() => seasonStartYear());
    // Career stats name seasons '2026-2027'. Shares the calendar's season, so
    // the leaderboards reset on their own when it rolls over in August.
    const seasonLabel = `${season}-${season + 1}`;
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [eventsError, setEventsError] = useState(false);

    const getLeaderboardData = async (currentSeason) => {
        try {
            setIsLoading(true);
            const response = await getCareerStats();
            const data = response?.data || [];

            // Filter for the current season
            const currentSeasonData = data.filter(
                (record) => record.season === currentSeason
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
        getLeaderboardData(seasonLabel);
    }, [seasonLabel]);

    useEffect(() => {
        const getCalendarEvents = async () => {
            try {
                const response = await getEvents(season);
                setEvents(response?.data || []);
            } catch (error) {
                console.error('Error fetching calendar events:', error);
                setEventsError(true);
            } finally {
                setEventsLoading(false);
            }
        };
        getCalendarEvents();
    }, [season]);

    return (
        <Home
            topPinners={topPinners}
            topTechFalls={topTechFalls}
            bestRecords={bestRecords}
            isLoading={isLoading}
            seasonLabel={seasonLabel}
            events={events}
            season={season}
            eventsLoading={eventsLoading}
            eventsError={eventsError}
        />
    );
};

export default HomeContainer;
