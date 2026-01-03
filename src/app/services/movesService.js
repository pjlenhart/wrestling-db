import axios from 'axios';

const api = axios.create({
    baseURL: 'https://glitch-dev.org',
});

export async function getUrls() {
    return api.get(`/api/videos/urls`);
}

export async function getVideos(page, size) {
    return api.get(`/api/videos/findAll?page=${page}&size=${size}`);
}

export async function search(searchValue) {
    return api.get(`/api/videos/search?text=${searchValue}`);
}

export async function getPlaylists() {
    return api.get(`/api/match-playlists/all`);
}