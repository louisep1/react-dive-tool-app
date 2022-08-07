import axios from 'axios'
import { toast } from 'react-toastify'

const OPENWEATHER_URL = 'https://api.openweathermap.org'
const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_KEY

const openWeather = axios.create({
  baseURL: OPENWEATHER_URL,
})

export const searchCities = async city => {
  const params = new URLSearchParams({
    q: city,
  })
  try {
    const response = await openWeather.get(
      `/data/2.5/weather?${params}&units=metric&appid=${OPENWEATHER_KEY}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    toast.error('City not found.')
  }
}
