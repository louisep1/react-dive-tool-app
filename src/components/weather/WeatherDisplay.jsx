import { useContext } from "react"
import WeatherContext from "../../context/weatherContext/WeatherContext"
import WeatherItem from "./WeatherItem"

function WeatherDisplay() {

  const { cities } = useContext(WeatherContext)

  if (cities.length === 0) {
    return (
      <div className='card bg-warning text-center p-2 my-10 mx-auto w-max'>Currently no weather to be displayed</div>
    )
  } else {
    return (
      <>
        {/* <div className='card bg-slate-400 text-center p-2 my-10 mx-auto w-max'>Weather forecast pending...</div> */}
        {cities.map(city => <WeatherItem key={city.id} city={city} />)}
      </>
    )
  }
}

export default WeatherDisplay