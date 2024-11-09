import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForecastContent from './ForecastContent';
import {mockWeatherData} from "@/__mocks__/mockForecastData";
import useWeather from "@/hooks/useWeather";

jest.mock('../../../hooks/useWeather');

describe('ForecastContent Component', () => {

    it('does not render NextForecast component when there is an error', () => {
        (useWeather as jest.Mock).mockReturnValue({
            ...mockWeatherData,
            forecast: { forecastday: [] },
            loading: false,
            error: 'Unable to fetch data',
        });

        render(<ForecastContent />);

        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.queryByTestId('today-forecast')).not.toBeInTheDocument();
    });

    it('displays loading spinner when loading is true', () => {
        (useWeather as jest.Mock).mockReturnValue({
            loading: true,
            city: '',
            current: undefined,
            forecast: { forecastday: [] },
            error: null,
        });

        render(<ForecastContent />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
});
