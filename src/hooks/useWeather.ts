import { useState, useEffect } from 'react';
import { Period } from '../types/WeatherTypes';
import { fetchForecast, fetchGridPoint } from '../api/weatherService';
import {DEFAULT_CITY, DEFAULT_DATA} from "../config/constants";

export const useWeather = () => {
    const [city, setCity] = useState<string>(DEFAULT_CITY);
    const [forecast, setForecast] = useState<Period[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInitialForecast = async () => {
        try {
            setLoading(true);
            const defaultData = await fetchForecast(DEFAULT_DATA.id, DEFAULT_DATA.x, DEFAULT_DATA.y);
            setForecast(defaultData.properties.periods);
        } catch {
            setError('Failed to fetch default weather data.');
        } finally {
            setLoading(false);
        }
    };

    const handleCitySelect = async (lat: string, lon: string, selectedCity: string) => {
        try {
            setLoading(true);
            setError(null);
            const gridData = await fetchGridPoint(lat, lon);
            const forecastData = await fetchForecast(gridData.properties.gridId, gridData.properties.gridX, gridData.properties.gridY);
            setCity(selectedCity);
            setForecast(forecastData.properties.periods);
        } catch {
            setError('Failed to fetch weather data for the selected city.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialForecast();
    }, []);

    return { city, forecast, loading, error, handleCitySelect, setCity };
};