const forecastIcons: { [key: string]: string } = {
    "sunny|clear": require('../assets/icons/sunny.svg').default,
    "thunder|storms": require('../assets/icons/thunder.svg').default,
    "rain|rainy|shower": require('../assets/icons/rainy.svg').default,
    "cloudy|foggy|mist": require('../assets/icons/cloudy.svg').default,
    defaultDay: require('../assets/icons/day.svg').default,
    defaultNight: require('../assets/icons/night.svg').default,
};
export default forecastIcons;