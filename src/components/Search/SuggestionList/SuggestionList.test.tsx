import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuggestionList from './SuggestionList';
import { PhotonSuggestion } from '../../../types/WeatherTypes';

describe('SuggestionList Component', () => {
    const mockSuggestions: PhotonSuggestion[] = [
        { name: 'Seattle', countryName: 'USA', lat: '47.6062', lon: '-122.3321' },
        { name: 'Kyiv', countryName: 'Ukraine', lat: '50.4501', lon: '30.5234' },
    ];

    const mockOnSelect = jest.fn();

    it('should render without crashing', () => {
        render(<SuggestionList suggestions={mockSuggestions} onSelect={mockOnSelect} />);
        expect(screen.getByText('Seattle, USA')).toBeInTheDocument();
        expect(screen.getByText('Kyiv, Ukraine')).toBeInTheDocument();
    });

    it('should not render when suggestions array is empty', () => {
        const { container } = render(<SuggestionList suggestions={[]} onSelect={mockOnSelect} />);
        expect(container.firstChild).toBeNull();
    });

    it('should call onSelect with the correct city when a suggestion is clicked', () => {
        render(<SuggestionList suggestions={mockSuggestions} onSelect={mockOnSelect} />);
        const suggestionItem = screen.getByText('Seattle, USA');
        fireEvent.click(suggestionItem);
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith({
            name: 'Seattle',
            countryName: 'USA',
            lat: '47.6062',
            lon: '-122.3321',
        });
    });

    it('should render the correct number of suggestions', () => {
        render(<SuggestionList suggestions={mockSuggestions} onSelect={mockOnSelect} />);
        const suggestionItems = screen.getAllByLabelText('suggestion');
        expect(suggestionItems.length).toBe(2);

    });
});
