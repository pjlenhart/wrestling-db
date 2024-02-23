import React, { useState, useEffect } from 'react';
import { getSchools, getSchoolById } from '../../services/schoolService';
import Schools from './Schools';

const SchoolContainer = () => {
    const [schools, setSchools] = useState([]);

    const getAllSchools = async () => {
        const response = await getSchools();
        const data = response?.data;
        setSchools(data);
    };

    useEffect(() => {
        getAllSchools();
    }, []);

    const regions = [...new Set(schools.map((school) => school.region))];

    return <Schools schools={schools} regions={regions} />;
};

export default SchoolContainer;
