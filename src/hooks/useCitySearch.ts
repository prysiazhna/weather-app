import {useState, useEffect, ChangeEvent} from 'react';
import {useDebounce} from "./useDebounce";
import {PhotonSuggestion} from "../types/WeatherTypes";
import {fetchCitySuggestionsFromPhoton} from "../api/weatherService";
import {fullAddress} from "../utils/fullAddress";

const useCitySearch = (onSelectCity: (lat: string, lon: string, city: string) => void) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<PhotonSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedInput = useDebounce(inputValue, 300);
    const [isShowSuggestions, setIsShowSuggestions] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsShowSuggestions(false);
    };

    const clearInput = () => {
        setInputValue('');
        setSuggestions([]);
    };

    const handleCitySelect = (city: PhotonSuggestion) => {
        let fullCityAddress = fullAddress(city);
        setIsShowSuggestions(true);
        setInputValue(fullCityAddress);
        setSuggestions([]);
        onSelectCity(city.lat, city.lon, fullCityAddress);
    };

    useEffect(() => {
        if (debouncedInput.trim() && !isShowSuggestions) {
            setLoading(true);
            fetchCitySuggestionsFromPhoton(debouncedInput)
                .then((cities) => {
                    setSuggestions(cities);
                })
                .catch((error) => {
                    console.error('Failed to fetch city suggestions:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setSuggestions([]);
        }
    }, [debouncedInput, isShowSuggestions]);

    return {
        inputValue,
        setInputValue,
        suggestions,
        setSuggestions,
        loading,
        setLoading,
        handleInputChange,
        clearInput,
        handleCitySelect,
    };
};

export default useCitySearch;
