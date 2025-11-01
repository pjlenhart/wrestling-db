import axios from 'axios';

const api = axios.create({
    baseURL: 'https://150.136.168.38:8443',
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
