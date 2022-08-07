import axios from 'axios'
import { toast } from 'react-toastify'

const OPENWEATHER_URL = 'https://api.openweathermap.org'
const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_KEY


// https://api.openweathermap.org
// /data/2.5/weather?
// q=naha
// &units=metric&appid=
// 3dbf2673955ba9060b4af87c8d188f1e

// https://api.openweathermap.org/data/2.5/weather?q=naha&units=metric&appid=3dbf2673955ba9060b4af87c8d188f1e

const openWeather = axios.create({
  baseURL: OPENWEATHER_URL,
  // headers: { Authorization: OPENWEATHER_KEY }
  // I don't really understand this headers section or if I've even done it correctly - I don't think I have !!!
})


export const searchCities = async (city) => {
  const params = new URLSearchParams({
    q: city
  })
  try {
    const response = await openWeather.get(`/data/2.5/weather?${params}&units=metric&appid=${OPENWEATHER_KEY}`)
    // console.log(response)
    // console.log(response.data)
    return response.data
    // this data is returned so that when called later in WeatherSearch, the returned results are saved to a variable
  } catch (error) {
    console.log(error)
    toast.error('City not found.')
    // alert('City not found. Please check the city you searched for is spelt correctly, or try a different city name search criterion.')
  }
}