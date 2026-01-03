import axios from 'axios';

const api = axios.create({
    baseURL: 'https://glitch-dev.org',
});

export async function getPlaylists() {
    return api.get(`/api/match-playlists/all`);
}

