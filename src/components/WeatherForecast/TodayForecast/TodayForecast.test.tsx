import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodayForecast from './TodayForecast';
import {Card, Spinner, Alert} from 'react-bootstrap';

describe('TodayForecast Component', () => {
    const mockForecast = {
        temperature: 72,
        temperatureUnit: 'F',
        shortForecast: 'Partly Cloudy',
        icon: '',
        isDaytime: true,
    };

    it('should render without errors', () => {
        render(<TodayForecast city="New York" forecast={mockForecast} loading={false} error={null}/>);
        const weatherCardElement = screen.getByTestId('weather-card');
        expect(weatherCardElement).toBeInTheDocument();
    });

    it('should display loading spinner when loading is true', () => {
        render(<TodayForecast city="New York" forecast={mockForecast} loading={true} error={null}/>);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should display an error message when error is present', () => {
        const errorMessage = 'Unable to fetch weather data';
        render(<TodayForecast city="New York" forecast={mockForecast} loading={false} error={errorMessage}/>);
        const alertElement = screen.getByText(errorMessage);
        expect(alertElement).toBeInTheDocument();
    });

    it('should display correct forecast details when loading is false and no error', () => {
        render(<TodayForecast city="New York" forecast={mockForecast} loading={false} error={null}/>);
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText(`${mockForecast.temperature}°${mockForecast.temperatureUnit}`)).toBeInTheDocument();
        expect(screen.getByText(mockForecast.shortForecast)).toBeInTheDocument();
    });

    it('should not display error message when data is loaded', () => {
        render(<TodayForecast city="New York" forecast={mockForecast} loading={false} error={null}/>);
        expect(screen.queryByText('Unable to fetch weather data')).not.toBeInTheDocument();
    });
});
