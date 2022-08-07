import { WeatherProvider } from "../context/weatherContext/WeatherContext"
import Header from "../components/shared/Header"
import WeatherSubHeading from '../components/weather/WeatherSubHeading'
import WeatherSearch from "../components/weather/WeatherSearch"
import WeatherDisplay from "../components/weather/WeatherDisplay"

function WeatherPage() {
  return (
    <WeatherProvider>
      <Header title='Weather Forecast' />
      <WeatherSubHeading />
      <WeatherDisplay />
      <WeatherSearch />
    </WeatherProvider>
  )
}

export default WeatherPage