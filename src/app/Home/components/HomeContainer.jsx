import React, { useState, useEffect } from 'react';
import { getTeamMatches } from '../../services/teamMatchService';
import { getAnnouncements } from '../../services/widgetService';
import Home from './Home';

const HomeContainer = () => {
    const [teamMatches, setTeamMatches] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    const getTeamMatchesAll = async () => {
        const response = await getTeamMatches('desc');
        const data = response?.data;
        setTeamMatches(data);
    };

    const getCurrentAnnoucements = async () => {
        const response = await getAnnouncements();
        const data = response?.data;
        const today = new Date().toISOString().slice(0, 10);
        const currentAnnoucements = data.filter(
            (ann) =>
                (today >= ann.start_date && ann.expiration_date > today) ===
                true
        );
        setAnnouncements(currentAnnoucements);
    };

    useEffect(() => {
        getTeamMatchesAll();
        getCurrentAnnoucements();
    }, []);

    return (
        <Home
            teamMatchData={teamMatches.reverse().slice(0, 7)}
            announcements={announcements}
        />
    );
};

export default HomeContainer;
