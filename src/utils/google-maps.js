/* global google */
let promise
export default function loadGoogleMapsApi() {
  if (promise) return promise

  promise = new Promise(function(resolve, reject) {
    var scriptTag = document.createElement('script')
    scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.VUE_APP_GOOGLE_MAPS_PLACES_API_KEY
    }&libraries=places&language=es`

    scriptTag.onload = function() {
      const googleMapsAutocompleteService = new google.maps.places.AutocompleteService(
        { type: ['regions'] }
      )
      const googleMapsPlacesService = new google.maps.places.PlacesService(
        document.createElement('div')
      )

      resolve({
        googleMapsAutocompleteService,
        googleMapsPlacesService,
      })
    }
    document.body.appendChild(scriptTag)
  })

  return promise
}
