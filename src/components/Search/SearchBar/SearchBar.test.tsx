import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import * as useCitySearchHook from '../../../hooks/useCitySearch';
import * as useCurrentLocationHook from '../../../hooks/useCurrentLocation';
import { PhotonSuggestion } from '../../../types/WeatherTypes';

describe('SearchBar Component', () => {
    const mockOnSelectCity = jest.fn();

    beforeEach(() => {
        jest.spyOn(useCitySearchHook, 'default').mockReturnValue({
            inputValue: 'Seattle',
            setInputValue: jest.fn(),
            suggestions: [
                { name: 'Seattle', countryName: 'USA', lat: '47.6062', lon: '-122.3321' },
                { name: 'Kyiv', countryName: 'Ukraine', lat: '50.4501', lon: '30.5234' },
            ] as PhotonSuggestion[],
            setSuggestions: jest.fn(),
            loading: false,
            setLoading: jest.fn(),
            clearInput: jest.fn(),
            handleCitySelect: jest.fn(),
            handleInputChange: jest.fn(),
        });

        jest.spyOn(useCurrentLocationHook, 'default').mockReturnValue({
            handleGetCurrentLocation: jest.fn(),
            loading: false,
        });
    });

    it('should render SearchBar without crashing', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });

    it('should render the input field with default value', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveValue('Seattle');
    });

    it('should display suggestions when available', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        expect(screen.getByText('Seattle, USA')).toBeInTheDocument();
        expect(screen.getByText('Kyiv, Ukraine')).toBeInTheDocument();
    });

    it('should trigger handleCitySelect when a suggestion is clicked', () => {
        const handleCitySelect = jest.fn();
        jest.spyOn(useCitySearchHook, 'default').mockReturnValueOnce({
            inputValue: 'Seattle',
            setInputValue: jest.fn(),
            suggestions: [
                { name: 'Seattle', countryName: 'USA', lat: '47.6062', lon: '-122.3321' },
                { name: 'Kyiv', countryName: 'Ukraine', lat: '50.4501', lon: '30.5234' },
            ] as PhotonSuggestion[],
            setSuggestions: jest.fn(),
            loading: false,
            setLoading: jest.fn(),
            clearInput: jest.fn(),
            handleCitySelect,
            handleInputChange: jest.fn(),
        });

        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        const suggestionItem = screen.getByText('Seattle, USA');
        fireEvent.click(suggestionItem);
        expect(handleCitySelect).toHaveBeenCalledTimes(1);
    });

    it('should trigger handleGetCurrentLocation when the GeoAltFill icon is clicked', () => {
        const handleGetCurrentLocation = jest.fn();
        jest.spyOn(useCurrentLocationHook, 'default').mockReturnValueOnce({
            handleGetCurrentLocation,
            loading: false,
        });

        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        const geoIcon = screen.getByLabelText('get-location');
        fireEvent.click(geoIcon);
        expect(handleGetCurrentLocation).toHaveBeenCalledTimes(1);
    });


    it('should show loading indicator when fetching location or searching for cities', () => {
        jest.spyOn(useCitySearchHook, 'default').mockReturnValueOnce({
            inputValue: '',
            setInputValue: jest.fn(),
            suggestions: [],
            setSuggestions: jest.fn(),
            loading: true,
            setLoading: jest.fn(),
            clearInput: jest.fn(),
            handleCitySelect: jest.fn(),
            handleInputChange: jest.fn(),
        });

        jest.spyOn(useCurrentLocationHook, 'default').mockReturnValueOnce({
            handleGetCurrentLocation: jest.fn(),
            loading: true,
        });

        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        const loadingIndicator = screen.getByRole('status');
        expect(loadingIndicator).toBeInTheDocument();
    });
});
