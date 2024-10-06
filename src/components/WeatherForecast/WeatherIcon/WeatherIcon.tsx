import React from 'react';
import forecastIcons from '../../../config/weatherIcons';

interface WeatherIconProps {
    shortForecast: string;
    isDaytime: boolean;
    size?: 'small' | 'medium' | 'large';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ shortForecast, isDaytime, size = 'medium' }) => {
    const matchedIcon = Object.keys(forecastIcons).find((key) =>
        new RegExp(key, 'i').test(shortForecast)
    );

    const iconSrc = matchedIcon
        ? forecastIcons[matchedIcon]
        : isDaytime
            ? forecastIcons.defaultDay
            : forecastIcons.defaultNight;

    const sizeClass = size === 'small' ? 'weather-icon-small' : size === 'large' ? 'weather-icon-large' : 'weather-icon-medium';

    return <img src={iconSrc} alt={shortForecast} className={`weather-icon ${sizeClass}`} />;
};

export default WeatherIcon;
