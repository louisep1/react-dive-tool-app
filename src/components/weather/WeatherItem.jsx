import { useContext } from 'react'
import WeatherContext from '../../context/weatherContext/WeatherContext'

import Clear from './img/sun.png'
import Clouds from './img/cloudy.png'
import Rain from './img/rainy.png'
import Drizzle from './img/drizzle.png'
import Snow from './img/snow.png'
import Mist from './img/mist.png'
import Thunderstorm from './img/thunder.png'

function WeatherItem({ city }) {

  const { dispatch, state } = useContext(WeatherContext)

  const hoverText = `Feels like ${Math.round(city.feelsLike)}°C, ${city.description}`

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_CITY',
      payload: city.id
    })
  }

  const handleHighlight = () => {
    if (city.highlighted === false) {
      dispatch({
        type: 'HIGHLIGHT_CITY',
        payload: city
      })
    } else {
      dispatch({
        type: 'UNHIGHLIGHT',
        payload: city
      })
    }
  }

  return (
    <div className='relative rounded-full bg-slate-400 text-xl p-2 my-10 mx-auto w-64'>
      <button onClick={handleHighlight} className={`btn btn-xs btn-ghost absolute top-0 -left-5 text-lg ${city.highlighted === true && 'text-pink-500'}`}>♡</button>
      <button onClick={handleDelete} className='btn btn-xs btn-ghost absolute top-1 -right-4'>x</button>

      <div className="tooltip pt-2 pb-1.5" data-tip={hoverText}>
        <div className='text-left font-bold px-6 '>{city.location}, {city.country}</div>
        <div className='flex justify-around items-center px-4 py-0 w-60 h-10'>
          <div>{Math.round(city.airTemp)}°C</div>
          <img className='w-12' src={
            city.weather === 'Clouds' ? Clouds :
              city.weather === 'Clear' ? Clear :
                city.weather === 'Rain' ? Rain :
                  city.weather === 'Drizzle' ? Drizzle :
                    city.weather === 'Snow' ? Snow :
                      city.weather === 'Mist' ? Mist :
                        city.weather === 'Thunderstorm' ? Thunderstorm : null
          } alt={city.weather} />
        </div>
      </div>
    </div>
  )
}

export default WeatherItem