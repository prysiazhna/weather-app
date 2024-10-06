import {Period} from "../types/WeatherTypes";
import {WEEKDAYS} from "../config/constants";

export const getNextForecast = (forecast: Period[]): Period[] => {
    return forecast
        .filter((period) => period.isDaytime && WEEKDAYS.includes(period.name.split(' ')[0]))
        .reduce((acc: Array<Period>, period) => {
            const dayName = period.name.split(' ')[0];
            if (!acc.some((item) => item.name.includes(dayName))) {
                acc.push(period);
            }
            return acc;
        }, [])
        .slice(0, 3);
};