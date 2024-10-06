export interface Period {
    number: number;
    name: string;
    temperature: number;
    temperatureUnit: string;
    detailedForecast: string;
    icon: string;
    shortForecast: string;
    isDaytime: boolean;
}

export interface Forecast {
    properties: {
        periods: Period[];
    };
}

export interface Gridpoint {
    properties: {
        gridId: string;
        gridX: number;
        gridY: number;
    };
}

export interface PhotonSuggestion {
    name: string;
    lat: string;
    lon: string;
    countryName: string;
}