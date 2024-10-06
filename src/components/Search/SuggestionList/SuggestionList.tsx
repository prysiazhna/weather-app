import React from 'react';
import { PhotonSuggestion } from '../../../types/WeatherTypes';
import './SuggestionList.css';

interface SuggestionListProps {
    suggestions: PhotonSuggestion[];
    onSelect: (city: PhotonSuggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect }) => {
    if (suggestions.length === 0) return null;

    return (
        <div className="suggestions-list">
            {suggestions.map((city, index) => (
                <div
                    aria-label="suggestion"
                    key={index}
                    className="suggestion-item"
                    onClick={() => onSelect(city)}>
                    {city.name}, {city.countryName}
                </div>
            ))}
        </div>
    );
};

export default SuggestionList;
