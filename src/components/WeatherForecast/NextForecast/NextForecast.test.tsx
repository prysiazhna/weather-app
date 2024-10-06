import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NextForecast from './NextForecast';

const mockPeriods = [
    {
        number: 1,
        name: 'Monday',
        temperature: 75,
        temperatureUnit: 'F',
        shortForecast: 'Sunny',
        icon: '',
        isDaytime: true,
    },
    {
        number: 2,
        name: 'Tuesday',
        temperature: 68,
        temperatureUnit: 'F',
        shortForecast: 'Cloudy',
        icon: '',
        isDaytime: false,
    },
    {
        number: 3,
        name: 'Wednesday',
        temperature: 80,
        temperatureUnit: 'F',
        shortForecast: 'Rainy',
        icon: '',
        isDaytime: true,
    },
];

describe('NextForecast Component', () => {
    it('should render without errors', () => {
        render(<NextForecast periods={mockPeriods}/>);
        const nextForecastElement = screen.getByTestId('next-forecast');
        expect(nextForecastElement).toBeInTheDocument();
    });

    it('should display the correct number of periods', () => {
        render(<NextForecast periods={mockPeriods}/>);
        const forecastCards = screen.getAllByTestId('period');
        expect(forecastCards.length).toBe(mockPeriods.length);
    });


    it('should display the correct temperature and forecast for each period', () => {
        render(<NextForecast periods={mockPeriods}/>);
        mockPeriods.forEach((period) => {
            expect(screen.getByText(`${period.temperature}°${period.temperatureUnit}`)).toBeInTheDocument();
            expect(screen.getByText(period.shortForecast)).toBeInTheDocument();
        });
    });

    it('should display the correct day names', () => {
        render(<NextForecast periods={mockPeriods}/>);
        mockPeriods.forEach((period) => {
            expect(screen.getByText(period.name)).toBeInTheDocument();
        });
    });
});
