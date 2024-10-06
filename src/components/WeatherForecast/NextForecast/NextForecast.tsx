import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import './NextForecast.css';

interface NextForecastProps {
    periods: Array<{
        number: number;
        name: string;
        temperature: number;
        temperatureUnit: string;
        shortForecast: string;
        icon: string;
        isDaytime: boolean;
    }>;
}

const NextForecast: React.FC<NextForecastProps> = ({ periods }) => {
    return (
        <Row data-testid="next-forecast" className="next-forecast gy-3">
            {periods.map((period) => (
                <Col data-testid="period" key={period.number} xs={12} md={4}>
                    <Card className="text-center mb-4 forecast-card">
                        <Card.Body>
                            <Card.Title className="mb-0">{period.name}</Card.Title>
                            <WeatherIcon shortForecast={period.shortForecast} size="medium" isDaytime={period.isDaytime} />
                            <Card.Text className="small-text">
                                {period.temperature}°{period.temperatureUnit}
                            </Card.Text>
                            <Card.Text className="small-text">{period.shortForecast}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};


export default NextForecast;
