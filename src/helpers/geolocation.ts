export const getCurrentLocation = (): Promise<{ lat: string; lon: string }> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude.toString(), lon: longitude.toString() });
                },
                error => reject(error)
            );
        } else {
            reject('Geolocation is not supported by your browser.');
        }
    });
};
