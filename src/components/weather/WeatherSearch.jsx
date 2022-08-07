import { useState, useContext } from 'react'
import WeatherContext from '../../context/weatherContext/WeatherContext'
import { searchCities } from '../../context/weatherContext/WeatherActions'

function WeatherSearch() {
  const [searchCity, setSearchCity] = useState('')

  const { cities, dispatch } = useContext(WeatherContext)




  const handleClick = async (e) => {
    e.preventDefault()

    // saving the returned search result data to a variable byt using await to wait for the response:
    const searchCityData = await searchCities(searchCity)

    // console.log({ id: searchCityData.id, location: searchCityData.name, weather: searchCityData.weather[0].main, description: searchCityData.weather[0].description, airTemp: searchCityData.main.temp })

    if (cities.filter(city => city.id === searchCityData.id).length > 0) {
      alert('City already listed')
    } else {
      dispatch({
        type: 'ADD_CITY',
        payload: { id: searchCityData.id, location: searchCityData.name, country: searchCityData.sys.country, weather: searchCityData.weather[0].main, description: searchCityData.weather[0].description, airTemp: searchCityData.main.temp, feelsLike: searchCityData.main.feels_like, highlighted: false }
      })
    }

    setSearchCity('')
  }


  return (
    <div>
      <form>
        <div className="mx-auto p-8 flex justify-center">
          <input className='w-52 sm:w-64 ml-2 rounded-lg rounded-r-none border-4 border-r-0 border-slate-300 p-2' type="text" placeholder="Enter city here" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
          <button onClick={handleClick} className='btn rounded-l-none'>Search Cities</button>
        </div>
      </form>
    </div>
  )
}

export default WeatherSearch