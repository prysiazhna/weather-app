const mockGeolocation = {
    getCurrentPosition: jest.fn((success, error) => {
        success({
            coords: {
                latitude: 47.6062,
                longitude: -122.3321,
            },
        });
    }),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    configurable: true,
});
export {};
