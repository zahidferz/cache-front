/* global jest */
window.google = {
  maps: {
    places: {
      PlacesServiceStatus: {
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  },
}

export default function loadGoogleMapsApi() {
  return Promise.resolve({
    googleMapsAutocompleteService: {
      getPlacePredictions: jest.fn().mockImplementation((config, callback) => {
        /* eslint-disable */
        return callback([
          { id: 1, description: 'Alpha' },
          { id: 2, description: 'Beta' },
        ])
      }),
    },
    googleMapsPlacesService: jest.fn(),
  })
}
