import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import './NextForecast.css';
import {getWeekDay} from "@/helpers/getWeekDay";
import {ForecastDay} from "@/models/WeatherTypes";

interface NextForecastProps {
    nextDays: ForecastDay[];
}

const NextForecast: React.FC<NextForecastProps> = ({nextDays}) => {
    return (
        <Row data-testid="next-forecast" className="next-forecast gy-3">
            {nextDays.map((nextDay, index) => (
                <Col data-testid="period" key={index} xs={12} md={6}>
                    <Card className="text-center mb-4 forecast-card">
                        <Card.Body>
                            <Card.Title className="mb-0">{getWeekDay(nextDay.date)}</Card.Title>
                            <WeatherIcon shortForecast={nextDay.day.condition.text} isDaytime={true} size="medium"/>
                            <Card.Text className="small-text">
                                {nextDay.day.avgtemp_f}°F
                            </Card.Text>
                            <Card.Text className="small-text">{nextDay.day.condition.text}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default NextForecast;
