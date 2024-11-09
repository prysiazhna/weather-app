import {CurrentWeather, Day} from "@/models/WeatherTypes";

export const mockCurrentWeather: CurrentWeather = {
    condition: { text: 'Partly Cloudy' },
    humidity: 50,
    is_day: 1,
    temp_c: 22,
    temp_f: 72,
    uv: 3,
    wind_dir: 'NW',
    wind_kph: 15,
    wind_mph: 9.3,
};

export const  mockDayData: Day ={
    maxtemp_c: 20,
    maxtemp_f: 68,
    mintemp_c: 10,
    mintemp_f: 50,
    avgtemp_c: 15,
    avgtemp_f: 59,
    avghumidity: 70,
    maxwind_kph: 20,
    maxwind_mph: 12.4,
    condition: { text: 'Partly Cloudy' },
};

export const mockWeatherData = {
    city: 'Seattle',
    current: mockCurrentWeather,
    forecast: {
        forecastday: [
            {
                date: '2024-11-11',
                day: mockDayData,
            },
        ],
    },
};

export const mockSuggestions = [
    { name: 'Chicago', lat: '41.8781', lon: '-87.6298', country: 'US' },
    { name: 'London', lat: '51.5074', lon: '-0.1278', country: 'UK' },
    { name: 'Paris', lat: '48.8566', lon: '2.3522', country: 'FR' },
];
