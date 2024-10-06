import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {useWeather} from '../../../hooks/useWeather';
import ForecastContent from "./ForecastContent";

jest.mock('../../../hooks/useWeather');

describe('WeatherApp Component', () => {

    it('renders SearchBar, WeatherCard, and NextForecast components when forecast is available', () => {
        (useWeather as jest.Mock).mockReturnValue({
            city: 'Seattle',
            forecast: [{temperature: 18, shortForecast: 'Cloudy'}],
            loading: false,
            error: null,
            handleCitySelect: jest.fn(),
        });
        render(<ForecastContent/>);
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByTestId('weather-card')).toBeInTheDocument();
        expect(screen.getByTestId('next-forecast')).toBeInTheDocument();
    });

    it('does not render NextForecast component when error is present', () => {
        (useWeather as jest.Mock).mockReturnValue({
            city: 'Seattle',
            forecast: [],
            loading: false,
            error: 'Unable to fetch data',
            handleCitySelect: jest.fn(),
        });
        render(<ForecastContent/>);
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByTestId('weather-card')).toBeInTheDocument();
        expect(screen.queryByTestId('next-forecast')).not.toBeInTheDocument();
    });

    it('displays loading state when loading is true', () => {
        (useWeather as jest.Mock).mockReturnValue({
            city: 'Seattle',
            forecast: [],
            loading: true,
            error: null,
            handleCitySelect: jest.fn(),
        });
        render(<ForecastContent/>);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });


    it('displays error message when error is present', async () => {
        (useWeather as jest.Mock).mockReturnValue({
            city: 'Seattle',
            forecast: [],
            loading: false,
            error: 'Failed to fetch',
            handleCitySelect: jest.fn(),
        });
        render(<ForecastContent/>);
        await waitFor(() => expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument());
    });
});
