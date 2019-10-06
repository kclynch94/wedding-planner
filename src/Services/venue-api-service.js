import config from '../config'

const VenueApiService = {
  getVenues() {
    return fetch(`${config.API_ENDPOINT}/venues`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getVenue(venueId) {
    return fetch(`${config.API_ENDPOINT}/venues/${venueId}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default VenueApiService