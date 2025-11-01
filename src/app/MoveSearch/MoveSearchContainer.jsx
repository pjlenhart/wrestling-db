import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/movesService';
import MoveSearch from './MoveSearch';

const MoveSearchContainer = () => {
    const [videos, setVideos] = useState([]);

    const getAllVideos = async () => {
        try {
            const response = await getVideos(0, 100);
            console.log(response);
            const data = response?.data;
            setVideos(data.content);
        } catch (error) {
            console.error('Error fetching videos:', error);
            setVideos([]);
        }
    };

    useEffect(() => {
        getAllVideos();
    }, []);

    return <MoveSearch videos={videos} />;
};

export default MoveSearchContainer;
