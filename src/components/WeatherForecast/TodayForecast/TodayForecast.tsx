import React from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import './TodayForecast.css';
import WeatherIcon from "../WeatherIcon/WeatherIcon";

interface WeatherCardProps {
    city: string;
    forecast: {
        temperature: number;
        temperatureUnit: string;
        shortForecast: string;
        icon: string;
        isDaytime: boolean;
    };
    loading: boolean;
    error: string | null;
}

const TodayForecast: React.FC<WeatherCardProps> = ({ city, forecast, loading, error }) => {
    return (
        <Card data-testid="weather-card" className="weather-card text-center shadow-sm">
            <Card.Body className="weather-card-body d-flex justify-content-center align-items-center">
                {loading ? (
                    <Spinner data-testid="loading-spinner" animation="border" role="status" variant="light" />
                ) : error ? (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                ) : (
                    <>
                        <div>
                            <h4>{city}</h4>
                            <WeatherIcon shortForecast={forecast.shortForecast} size="large" isDaytime={forecast.isDaytime} />
                            <h2>
                                {forecast.temperature}°{forecast.temperatureUnit}
                            </h2>
                            <Card.Text>{forecast.shortForecast}</Card.Text>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default TodayForecast;
