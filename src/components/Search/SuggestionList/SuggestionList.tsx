import React from 'react';
import './SuggestionList.css';

interface CitySuggestion {
    name: string;
    lat: string;
    lon: string;
    country: string;
}

interface SuggestionListProps {
    suggestions: CitySuggestion[];
    onSelect: (city: CitySuggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({suggestions, onSelect}) => {
    if (suggestions.length === 0) return null;

    return (
        <div className="suggestions-list">
            {suggestions.map((city, index) => (
                <div
                    aria-label="suggestion"
                    key={index}
                    className="suggestion-item"
                    onClick={() => onSelect(city)}>
                    {city.name}, {city.country || 'Unknown'}
                </div>
            ))}
        </div>
    );
};


export default SuggestionList;
