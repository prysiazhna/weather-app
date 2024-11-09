import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NextForecast from './NextForecast';
import { ForecastDay } from '../../../types/WeatherTypes';
import { getWeekDay } from '../../../utils/getWeekDay';
import {mockDayData} from "../../../__mocks__/mockForecastData";

const createMockForecastDay = (
    date: string,
    conditionText: string,
    avgTempF: number
): ForecastDay => ({
    date,
    day: {
        ...mockDayData,
        avgtemp_f: avgTempF,
        condition: { text: conditionText },
    },
});

const mockNextDays: ForecastDay[] = [
    createMockForecastDay('2024-11-11', 'Sunny', 75),
    createMockForecastDay('2024-11-12', 'Cloudy', 68),
    createMockForecastDay('2024-11-13', 'Rainy', 80),
];

const renderComponent = (nextDays = mockNextDays) => render(<NextForecast nextDays={nextDays} />);

describe('NextForecast Component', () => {
    it('renders without errors', () => {
        renderComponent();
        expect(screen.getByTestId('next-forecast')).toBeInTheDocument();
    });

    describe('Forecast Cards', () => {
        it('displays the correct number of forecast cards', () => {
            renderComponent();
            expect(screen.getAllByTestId('period')).toHaveLength(mockNextDays.length);
        });

        it('displays the correct temperature and forecast for each day', () => {
            renderComponent();
            mockNextDays.forEach(({ day }) => {
                expect(screen.getByText(`${day.avgtemp_f}°F`)).toBeInTheDocument();
                expect(screen.getByText(day.condition.text)).toBeInTheDocument();
            });
        });

        it('displays the correct day names', () => {
            renderComponent();
            mockNextDays.forEach(({ date }) => {
                expect(screen.getByText(getWeekDay(date))).toBeInTheDocument();
            });
        });
    });
});