import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import Records from './Records';

const RecordsContainer = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllRecords = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getCareerStats();
            const data = response?.data || [];
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
            setError('Failed to load records. Please try again later.');
            setRecords([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllRecords();
    }, []);

    return <Records records={records} isLoading={isLoading} error={error} />;
};

export default RecordsContainer;
