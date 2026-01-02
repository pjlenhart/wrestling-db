import React, { useState, useEffect } from 'react';
import { getWrestlers, getWrestlerById } from '../../services/rosterService';
import Wrestlers from './Wrestlers';

const WrestlerContainer = () => {
    const [wrestlers, setWrestlers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllWrestlers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getWrestlers();
            const data = response?.data || [];
            setWrestlers(data);
        } catch (error) {
            console.error('Error fetching wrestlers:', error);
            setError('Failed to load wrestlers. Please try again later.');
            setWrestlers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllWrestlers();
    }, []);

    return <Wrestlers roster={wrestlers} isLoading={isLoading} error={error} />;
};

export default WrestlerContainer;
