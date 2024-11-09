import {useState, useCallback} from 'react';
import {fetchForecast} from '@/api/weatherService';
import {Weather} from "@/models/WeatherTypes";

const useWeather = () => {
    const [city, setCity] = useState<string | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = useCallback(async (lat: string, lon: string) => {
        try {
            setLoading(true);
            setError(null);
            const weatherData = await fetchForecast(lat, lon);
            const cityName = `${weatherData.location.name}, ${weatherData.location.region}`;
            setCity(cityName);
            setWeather(weatherData);
        } catch (err) {
            setError('Failed to fetch forecast data');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        city,
        weather,
        loading,
        error,
        fetchWeather,
    };
};

export default useWeather;
