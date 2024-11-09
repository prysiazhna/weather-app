import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuggestionList from './SuggestionList';
import {mockSuggestions} from "@/__mocks__/mockForecastData";

describe('SuggestionList component', () => {
    const mockOnSelect = jest.fn();

    const setup = (suggestions = mockSuggestions) => {
        render(<SuggestionList suggestions={suggestions} onSelect={mockOnSelect} />);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with suggestions', () => {
        setup();
        const suggestionItems = screen.getAllByLabelText('suggestion');
        expect(suggestionItems).toHaveLength(mockSuggestions.length);
        expect(suggestionItems[0]).toHaveTextContent('Chicago, US');
        expect(suggestionItems[1]).toHaveTextContent('London, UK');
        expect(suggestionItems[2]).toHaveTextContent('Paris, FR');
    });

    it('does not render when suggestions array is empty', () => {
        setup([]);
        expect(screen.queryByLabelText('suggestion')).not.toBeInTheDocument();
    });

    it('calls onSelect with the correct city when a suggestion is clicked', () => {
        setup();
        const suggestionItems = screen.getAllByLabelText('suggestion');
        fireEvent.click(suggestionItems[1]);
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith(mockSuggestions[1]);
    });

    it('displays "Unknown" if country data is missing', () => {
        const suggestionsWithUnknownCountry = [
            { name: 'New York', lat: '40.7128', lon: '-74.0060', country: '' },
        ];
        setup(suggestionsWithUnknownCountry);
        expect(screen.getByLabelText('suggestion')).toHaveTextContent('New York, Unknown');
    });
});
