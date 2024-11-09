import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodayForecast from './TodayForecast';
import {mockCurrentWeather} from "@/__mocks__/mockForecastData";

describe('TodayForecast Component', () => {
    const renderComponent = (props = {}) =>
        render(
            <TodayForecast
                city="New York"
                current={mockCurrentWeather}
                loading={false}
                error={null}
                {...props}
            />
        );

    it('renders without errors', () => {
        renderComponent();
        const weatherCardElement = screen.getByTestId('weather-card');
        expect(weatherCardElement).toBeInTheDocument();
    });

    it('displays a loading spinner when loading is true', () => {
        renderComponent({ loading: true, current: undefined });
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('displays an error message when error is present', () => {
        const errorMessage = 'Unable to fetch weather data';
        renderComponent({ error: errorMessage, current: undefined });
        const alertElement = screen.getByText(errorMessage);
        expect(alertElement).toBeInTheDocument();
    });

    it('displays the correct forecast details when loading is false and no error', () => {
        renderComponent();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText(`${mockCurrentWeather.temp_f}°F`)).toBeInTheDocument();
        expect(screen.getByAltText(mockCurrentWeather.condition.text)).toBeInTheDocument();
        expect(screen.getByText(`Humidity: ${mockCurrentWeather.humidity}`)).toBeInTheDocument();
        expect(screen.getByText(`Wind: ${mockCurrentWeather.wind_mph} mph`)).toBeInTheDocument();
    });

    it('does not display the error message when data is loaded', () => {
        renderComponent();
        expect(screen.queryByText('Unable to fetch weather data')).not.toBeInTheDocument();
    });
});
