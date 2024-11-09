import React from 'react';
import {Card, Spinner, Alert} from 'react-bootstrap';
import './TodayForecast.css';
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {InfoCircle} from 'react-bootstrap-icons';
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import {formatDate} from "@/helpers/getWeekDay";
import {INFO} from "@/config/constants";
import {CurrentWeather} from "@/models/WeatherTypes";

interface WeatherCardProps {
    city: string| null;
    current: CurrentWeather | undefined;
    loading: boolean;
    error: string | null;
}

const TodayForecast: React.FC<WeatherCardProps> = ({city, current, loading, error}) => {
    return (
        <Card data-testid="weather-card" className="weather-card text-center shadow-sm">
            <Card.Body className="weather-card-body d-flex justify-content-center align-items-center">
                {loading ? (
                    <Spinner data-testid="loading-spinner" animation="border" role="status" variant="light"/>
                ) : error ? (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                ) : (
                    <>
                        <div className="w-100">
                            <div className="today mb-2">{formatDate()}</div>
                            <div className="d-flex justify-content-center align-items-center">
                                <h4 className="mb-0 me-2">{city}</h4>
                                <CustomTooltip content={INFO} position="top">
                                    <InfoCircle/>
                                </CustomTooltip>
                            </div>

                            {current && (
                                <>
                                    <WeatherIcon
                                        shortForecast={current.condition.text}
                                        isDaytime={!!current.is_day}
                                        size="large"/>
                                    <h2 className="mb-5">
                                        {current.temp_f}°F
                                    </h2>
                                    <div className="w-100 d-flex justify-content-around align-items-center flex-wrap">
                                        <h5>Humidity: {current.humidity}</h5>
                                        <h5>Wind: {current.wind_mph} mph</h5>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default TodayForecast;
