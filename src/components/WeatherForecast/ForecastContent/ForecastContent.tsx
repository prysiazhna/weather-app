import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SearchBar from '../../Search/SearchBar/SearchBar';
import TodayForecast from '../TodayForecast/TodayForecast';
import NextForecast from '../NextForecast/NextForecast';
import useCurrentLocation from '../../../hooks/useCurrentLocation';
import useWeather from '../../../hooks/useWeather';

const ForecastContent: React.FC = () => {
    const {city, weather, loading, error, fetchWeather} = useWeather();
    const {loading: locationLoading} = useCurrentLocation({fetchWeather});

    const renderContent = () => (
        <>
            <CenteredRow>
                <Col xs={10} md={8} lg={6}>
                    <TodayForecast
                        data-testid="today-forecast"
                        city={city}
                        current={weather?.current}
                        error={error}
                        loading={loading || locationLoading}/>
                </Col>
            </CenteredRow>
            {!loading && !locationLoading && !error && weather?.forecast && (
                <CenteredRow>
                    <Col xs={10} md={8} lg={6}>
                        <NextForecast nextDays={weather?.forecast.forecastday.slice(1)}/>
                    </Col>
                </CenteredRow>
            )}
        </>
    );

    return (
        <Container fluid className="weather-app-container">
            <Row className="justify-content-center mt-5">
                <Col xs={10} md={8} lg={6}>
                    <SearchBar onSelectCity={fetchWeather}/>
                </Col>
            </Row>
            {renderContent()}
        </Container>
    );
};

const CenteredRow: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <Row className="justify-content-center mt-3">
        {children}
    </Row>
);

export default ForecastContent;
