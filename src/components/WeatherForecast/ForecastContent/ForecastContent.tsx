import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SearchBar from '../../Search/SearchBar/SearchBar';
import TodayForecast from '../TodayForecast/TodayForecast';
import NextForecast from '../NextForecast/NextForecast';
import {useWeather} from '../../../hooks/useWeather';
import {getNextForecast} from '../../../utils/nextForecast';

const ForecastContent: React.FC = () => {
    const {city, forecast, loading, error, handleCitySelect} = useWeather();

    const nextForecast = getNextForecast(forecast);

    const renderContent = () => {
        return (
            <>
                <CenteredRow>
                    <Col xs={10} md={8} lg={6}>
                        <TodayForecast city={city} forecast={forecast[0]} loading={loading} error={error}/>
                    </Col>
                </CenteredRow>
                {!error && (
                    <CenteredRow>
                        <Col xs={10} md={8} lg={10}>
                            <NextForecast periods={nextForecast}/>
                        </Col>
                    </CenteredRow>
                )}
            </>
        );
    };

    return (
        <Container fluid className="weather-app-container">
            <Row className="justify-content-center mt-5">
                <Col xs={10} md={8} lg={6}>
                    <SearchBar onSelectCity={handleCitySelect}/>
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
