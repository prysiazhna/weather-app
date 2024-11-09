import { useState, useEffect } from 'react';
import { getCurrentLocation } from '@/helpers/geolocation';

interface UseCurrentLocationProps {
    fetchWeather: (lat: string, lon: string) => void;
}

const useCurrentLocation = ({ fetchWeather }: UseCurrentLocationProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getLocation = async () => {
            try {
                setLoading(true);
                const { lat, lon } = await getCurrentLocation();
                fetchWeather(lat, lon);
            } catch (error) {
                console.error('Failed to fetch current location:', error);
            } finally {
                setLoading(false);
            }
        };

        getLocation();

    }, [fetchWeather]);

    return { loading };
};

export default useCurrentLocation;
