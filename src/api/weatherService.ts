import { apiClient, NOMINATIM_API_URL, PHOTON_API_URL } from './apiConfig';
import { Forecast, Gridpoint, PhotonSuggestion } from '../types/WeatherTypes';
import axios from 'axios';

const handleApiError = (error: unknown): void => {
    console.error('API error occurred:', error);
};

export const fetchGridPoint = async (lat: string, lon: string): Promise<Gridpoint> => {
    try {
        const response = await apiClient.get<Gridpoint>(`/points/${lat},${lon}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch grid point data');
    }
};

export const fetchForecast = async (gridId: string, gridX: number, gridY: number): Promise<Forecast> => {
    try {
        const response = await apiClient.get<Forecast>(`/gridpoints/${gridId}/${gridX},${gridY}/forecast`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch forecast data');
    }
};

export const fetchCitySuggestionsFromPhoton = async (query: string): Promise<PhotonSuggestion[]> => {
    try {
        const response = await axios.get(PHOTON_API_URL, {
            params: {
                q: query,
                limit: 5,
                bbox: '-125.001650,24.9493,-66.9326,49.5904', // Search only in US
            },
        });

        return response.data.features.map((feature: any) => ({
            name: feature.properties.name,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
            countryName: feature.properties.country || 'Unknown Country',
        }));
    } catch (error) {
        handleApiError(error);
        return [];
    }
};

export const getCurrentCityName = async (lat: string, lon: string): Promise<string> => {
    try {
        const response = await axios.get(`${NOMINATIM_API_URL}/reverse`, {
            params: {
                format: 'json',
                lat,
                lon,
            },
            headers: {
                'Accept-Language': 'en',
            },
        });

        const { city, country } = response.data.address;
        return city && country ? `${city}, ${country}` : 'Unknown Location';
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch current city name');
    }
};
