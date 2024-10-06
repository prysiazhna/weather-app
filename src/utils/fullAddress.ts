import {PhotonSuggestion} from "../types/WeatherTypes";

export const fullAddress = (city:PhotonSuggestion ): string => {
    return `${city.name}, ${city.countryName}`
}