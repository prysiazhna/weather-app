import React from 'react';
import {InputGroup} from 'react-bootstrap';
import {GeoAltFill} from 'react-bootstrap-icons';
import './SearchBar.css';
import SuggestionList from '../SuggestionList/SuggestionList';
import SearchInput from '../SearchInput/SearchInput';
import useCitySearch from '../../../hooks/useCitySearch';
import useCurrentLocation from '../../../hooks/useCurrentLocation';

interface SearchBarProps {
    onSelectCity: (lat: string, lon: string, city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSelectCity}) => {
    const {
        inputValue,
        suggestions,
        loading: citySearchLoading,
        clearInput,
        handleCitySelect,
        handleInputChange,
    } = useCitySearch(onSelectCity);

    const {
        handleGetCurrentLocation,
        loading: locationLoading,
    } = useCurrentLocation({onSelectCity});


    return (
        <div data-testid="search-bar" className="wrapper">
            <InputGroup className="search-bar-input-group">
                <InputGroup.Text>
                    <GeoAltFill
                        role="button"
                        aria-label="get-location"
                        onClick={handleGetCurrentLocation}
                        size={18}/>
                </InputGroup.Text>
                <SearchInput
                    inputValue={inputValue}
                    loading={citySearchLoading || locationLoading}
                    clearInput={clearInput}
                    handleInputChange={handleInputChange}
                />
            </InputGroup>
            <SuggestionList suggestions={suggestions} onSelect={handleCitySelect}/>
        </div>
    );
};

export default SearchBar;
