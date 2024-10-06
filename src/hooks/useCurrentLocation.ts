import { useState } from 'react';
import { getCurrentLocation } from '../utils/geolocation';
import { getCurrentCityName } from '../api/weatherService';

interface UseCurrentLocationProps {
    onSelectCity: (lat: string, lon: string, city: string) => void;
}

const useCurrentLocation = ({ onSelectCity }: UseCurrentLocationProps) => {
    const [loading, setLoading] = useState(false);

    const handleGetCurrentLocation = async () => {
        try {
            setLoading(true);
            const { lat, lon } = await getCurrentLocation();
            const cityName = await getCurrentCityName(lat, lon);

            onSelectCity(lat, lon, cityName);
        } catch (error) {
            console.error('Failed to fetch current location or city name:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleGetCurrentLocation,
        loading
    };
};

export default useCurrentLocation;
