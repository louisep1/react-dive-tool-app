// https://react-leaflet.js.org/docs/start-setup/
// https://leafletjs.com/SlavaUkraini/examples/quick-start/
// needs to have leaflet and react-leaflet installed (as well as react and react-dom)
// needs container div with set height and the MapContained itself needs set height too
// also need to include styles link in index.html

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Header from '../components/shared/Header'
import LocationItem from '../components/diveMap/LocationItem'
import AddLocation from '../components/diveMap/AddLocation'
import Spinner from '../components/shared/Spinner'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
// https://firebase.google.com/docs/firestore/query-data/get-data

function DiveMapPage() {
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState('')
  const [search, setSearch] = useState('')
  const [filteredList, setFilteredList] = useState([])



  const fetchLocations = async () => {
    try {
      // get reference (to specific collection)
      const locationsRef = collection(db, 'sites')

      // create a query
      // !!! this step is redundant if there are no arguments - no actual query ((locationsRef) is not a query) 
      // if using query in future - change getDocs(locationsRef) to getDocs(q)
      // if not using query - change getDocs(q) to getDocs(locationsRef)
      const q = query(locationsRef, orderBy('country'))

      // execute query
      const querySnap = await getDocs(q)

      const locations = []

      querySnap.forEach((doc) => {
        return locations.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setLocations(locations)
      setFilteredList(locations)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [])
  // ! I need to think about what to put in this dependency array so that the component updates when I submit new data


  useEffect(() => {
    if (search === '') {
      setFilteredList(locations)
    }
  }, [search])



  const handleChange = (e) => {
    setSearch(e.target.value)
    // WE CANNOT DO THIS, because it will be the previous search state!!!! 
    // const keyword = search.toLowerCase()
    // Therefore: (up to date)
    const keyword = e.target.value.toLowerCase()
    const filtered = []
    locations.map(location => {
      if (location.data.location.toLowerCase().includes(keyword) || location.data.city.toLowerCase().includes(keyword) || location.data.country.toLowerCase().includes(keyword) || location.data.description.toLowerCase().includes(keyword)) {
        filtered.push(location)
      }
    })
    setFilteredList(filtered)
  }



  return (
    <div>
      <Header title='Dive Sites Map' />
      {loading && <Spinner />}

      {!loading && (
        <>
          <div className='grid justify-items-stretch grid-cols-1 md:grid-cols-2 px-4 gap-2'>
            <div id="map" style={{ height: '400px' }} >

              <MapContainer style={{ height: '100%', width: '100%' }} center={[0, 0]} zoom={1}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.length !== 0 && (locations.map(location =>
                  <Marker key={location.id} position={[location.data.geolocation.lat, location.data.geolocation.lng]}>
                    <Popup>
                      {location.data.location}{location.data.city && `, ${location.data.city}`} <br /> {location.data.country}. <br />
                      {location.data.description && location.data.description}
                    </Popup>
                  </Marker>
                )
                )}

              </MapContainer>
            </div>

            <div className='outline md:order-first m-1 p-2' style={{ height: '392px' }}>
              <div className='px-3 py-1'>
                <div className='text-xl font-semibold'>Locations:</div>
                <input className='input input-bordered input-xs w-full max-w-xs my-3' type="text" placeholder='Filter by location, city, country, etc...' id='search' value={search} onChange={handleChange} />

                <div className='h-72 overflow-auto'>
                  {locations === '' ? <div>No dive spots recorded in the database</div> :
                    filteredList.length === 0 ? <div>No dive spots found</div> :
                      (filteredList.length > 0 && filteredList !== locations) ?
                        (filteredList.map(location => (
                          <LocationItem key={location.id} data={location.data} />
                        ))) :
                        (locations.map(location => (
                          <LocationItem key={location.id} data={location.data} />
                        )))
                  }
                </div>

              </div>
            </div>
          </div>
          <AddLocation fetchLocations={fetchLocations} />
        </>

      )}

    </div>
  )
}

export default DiveMapPage