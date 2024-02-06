import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import Records from './Records';

const RecordsContainer = () => {
    const [records, setRecords] = useState([]);

    const getAllRecords = async () => {
        const response = await getCareerStats();
        const data = response.data?.data;
        setRecords(data);
    };

    useEffect(() => {
        getAllRecords();
    }, []);

    return <Records records={records} />;
};

export default RecordsContainer;
