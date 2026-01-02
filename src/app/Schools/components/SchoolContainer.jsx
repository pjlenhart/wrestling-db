import React, { useState, useEffect } from 'react';
import { getSchools, getSchoolById } from '../../services/schoolService';
import Schools from './Schools';

const SchoolContainer = () => {
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllSchools = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getSchools();
            const data = response?.data || [];
            setSchools(data);
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Failed to load schools. Please try again later.');
            setSchools([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllSchools();
    }, []);

    const regions = [...new Set(schools.map((school) => school.region))];

    return <Schools schools={schools} regions={regions} isLoading={isLoading} error={error} />;
};

export default SchoolContainer;
