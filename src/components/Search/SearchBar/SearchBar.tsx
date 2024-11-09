import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import SuggestionList from '../SuggestionList/SuggestionList';
import SearchInput from '../SearchInput/SearchInput';
import useCitySearch from "@/hooks/useCitySearch";

interface SearchBarProps {
    onSelectCity: (lat: string, lon: string, city?: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity }) => {
    const {
        inputValue,
        suggestions,
        loading,
        clearInput,
        handleInputChange,
        handleCitySelect,
    } = useCitySearch(onSelectCity);

    return (
        <div data-testid="search-bar" className="wrapper">
            <InputGroup className="search-bar-input-group">
                <InputGroup.Text>
                    <Search size={18} />
                </InputGroup.Text>
                <SearchInput
                    inputValue={inputValue}
                    loading={loading}
                    clearInput={clearInput}
                    handleInputChange={handleInputChange}
                />
            </InputGroup>
            <SuggestionList suggestions={suggestions} onSelect={handleCitySelect} />
        </div>
    );
};

export default SearchBar;
