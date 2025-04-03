import axios from 'axios'

const API_KEY = 'e18b6a035faed3364ce0faab29613288'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default {
  async getMoscowWeather() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: 'Moscow',
          appid: API_KEY,
          units: 'metric',
          lang: 'ru'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather:', error)
      return null
    }
  }
}