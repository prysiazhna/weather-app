import { useState, useEffect, ChangeEvent } from 'react';
import { useDebounce } from './useDebounce';
import {CitySuggestion} from "@/models/WeatherTypes";
import {fetchCitySuggestions, handleApiError} from "@/api/weatherService";

const useCitySearch = (fetchWeather: (lat: string, lon: string, city?: string) => void) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedInput = useDebounce(inputValue, 300);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const clearInput = () => {
        setInputValue('');
        setSuggestions([]);
    };

    const handleCitySelect = (city: CitySuggestion) => {
        setInputValue(city.name);
        fetchWeather(city.lat, city.lon);
        clearInput();
    };

    useEffect(() => {
        if (debouncedInput.trim()) {
            setLoading(true);
            fetchCitySuggestions(debouncedInput)
                .then((cities) => setSuggestions(cities))
                .catch((error) => {
                    handleApiError(error)
                    setSuggestions([]);
                })
                .finally(() => setLoading(false));
        } else {
            setSuggestions([]);
        }
    }, [debouncedInput]);

    return {
        inputValue,
        suggestions,
        loading,
        clearInput,
        handleInputChange,
        handleCitySelect,
    };
};

export default useCitySearch;
