export interface CitySuggestion {
    name: string;
    lat: string;
    lon: string;
    country: string;
}

export interface Weather {
    forecast: Forecast;
    current: CurrentWeather;
}

export interface CurrentWeather {
    condition: CurrentWeatherCondition
    humidity: number;
    is_day: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
}

export interface CurrentWeatherCondition {
    text: string;
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface ForecastDay {
    date: string;
    day: Day;
}

export interface Day {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avghumidity: number;
    maxwind_kph: number;
    maxwind_mph: number;
    condition: CurrentWeatherCondition;
}

