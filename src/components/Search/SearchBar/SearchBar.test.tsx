import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import useCitySearch from "@/hooks/useCitySearch";

jest.mock('../../../hooks/useCitySearch');

describe('SearchBar Component', () => {
    const mockOnSelectCity = jest.fn();
    const mockClearInput = jest.fn();
    const mockHandleInputChange = jest.fn();
    const mockHandleCitySelect = jest.fn();

    beforeEach(() => {
        (useCitySearch as jest.Mock).mockReturnValue({
            inputValue: '',
            suggestions: [
                { name: 'New York', lat: '40.7128', lon: '-74.0060', country: 'US' },
                { name: 'Los Angeles', lat: '34.0522', lon: '-118.2437', country: 'US' },
            ],
            loading: false,
            clearInput: mockClearInput,
            handleInputChange: mockHandleInputChange,
            handleCitySelect: mockHandleCitySelect,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without errors', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });

    it('renders SearchInput and SuggestionList components with correct props', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);

        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');

        expect(screen.getByText('New York, US')).toBeInTheDocument();
        expect(screen.getByText('Los Angeles, US')).toBeInTheDocument();
    });

    it('calls handleInputChange when input changes', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: 'Seattle' } });
        expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    });

    it('calls handleCitySelect when a suggestion is clicked', () => {
        render(<SearchBar onSelectCity={mockOnSelectCity} />);

        const suggestion = screen.getByText('New York, US');
        fireEvent.click(suggestion);

        expect(mockHandleCitySelect).toHaveBeenCalledWith({
            name: 'New York',
            lat: '40.7128',
            lon: '-74.0060',
            country: 'US',
        });
    });

    it('displays loading spinner in SearchInput when loading is true', () => {
        (useCitySearch as jest.Mock).mockReturnValue({
            inputValue: '',
            suggestions: [],
            loading: true,
            clearInput: mockClearInput,
            handleInputChange: mockHandleInputChange,
            handleCitySelect: mockHandleCitySelect,
        });

        render(<SearchBar onSelectCity={mockOnSelectCity} />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
