import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.weather.gov',
    headers: {
        'Accept': 'application/json',
    }
});

export const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';
export const PHOTON_API_URL = 'https://photon.komoot.io/api/';
