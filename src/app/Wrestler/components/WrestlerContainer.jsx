import React, { useState, useEffect } from 'react';
import { getWrestlers, getWreslterById } from '../../services/rosterService';
import Wrestlers from './Wrestlers';

const WrestlerContainer = () => {
    const [wrestlers, setWrestlers] = useState([]);

    const getAllWrestlers = async () => {
        const response = await getWrestlers();
        const data = response.data?.data;
        setWrestlers(data);
    };

    useEffect(() => {
        getAllWrestlers();
    }, []);

    return <Wrestlers roster={wrestlers} />;
};

export default WrestlerContainer;
