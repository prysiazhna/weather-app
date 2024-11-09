const forecastIcons: { [key: string]: string } = {
    "sunny|clear": require('../assets/icons/sunny.svg').default,
    "thunder": require('../assets/icons/thunder.svg').default,
    "rain|rainy|shower|storm": require('../assets/icons/rainy.svg').default,
    "cloudy|foggy|mist|overcast": require('../assets/icons/cloudy.svg').default,
    defaultDay: require('../assets/icons/day.svg').default,
    defaultNight: require('../assets/icons/night.svg').default,
};
export default forecastIcons;