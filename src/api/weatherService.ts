import { apiClient } from './apiConfig';
import {CitySuggestion} from "@/models/WeatherTypes";

export const handleApiError = (error: unknown): void => {
    console.error('API error occurred:', error);
};

const API_KEY = '6b6d8a7cbe2d4911be551313242010';

export const fetchCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
    try {
        const response = await apiClient.get('/search.json', {
            params: {
                q: query,
                key: API_KEY,
            }
        });

        return response.data.map((location: any) => ({
            name: location.name,
            lat: location.lat,
            lon: location.lon,
            country: location.country,
        }));
    } catch (error) {
        handleApiError(error);
        return [];
    }
};


export const fetchForecast = async (lat: string, lon: string): Promise<any> => {
    try {
        const response = await apiClient.get('/forecast.json', {
            params: {
                key: API_KEY,
                q: `${lat},${lon}`,
                days: 3
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch forecast data');
    }
};
