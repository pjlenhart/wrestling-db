import React, { useEffect, useState } from 'react';
import { getPlaylists } from '../services/playlistService';
import MatchPlaylists from './MatchPlaylists';

const MatchPlaylistsContainer = () => {
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllPlaylists = async () => {
        try {
            setIsLoading(true);
            const response = await getPlaylists();
            console.log(response);
            const data = response?.data || [];
            setPlaylists(data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
            setPlaylists([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllPlaylists();
    }, []);

    return <MatchPlaylists playlists={playlists} isLoading={isLoading} />;
};

export default MatchPlaylistsContainer;

