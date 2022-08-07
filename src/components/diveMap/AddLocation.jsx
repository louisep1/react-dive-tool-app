import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase.config'
// https://firebase.google.com/docs/firestore/manage-data/add-data
// https://developers.google.com/maps/documentation/geocoding/start

// use ref:
// https://thewebdev.info/2021/09/19/what-is-the-equivalent-of-document-getelementbyid-in-react/


function AddLocation({ fetchLocations }) {
  const [addLocation, setAddLocation] = useState({
    location: '',
    city: '',
    country: '',
    description: '',
    lat: 0,
    lng: 0,
  })

  const { location, city, country, description, lat, lng } = addLocation

  const coordPopupRef = useRef(null)

  const onChange = (e) => {
    setAddLocation((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
    // console.log(addLocation)
  }



  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      )

      const data = await response.json()

      console.log(data.results[0])


      // difference between setDoc() and addDoc() is setDoc requires you to submit a unique id, whereas addDoc will generate it for you
      const docRef = await addDoc(collection(db, 'sites'), {
        location: data.results[0].address_components[0].long_name,
        city: data.results[0].address_components[1].long_name,
        country: data.results[0].address_components[2].long_name,
        description,
        geolocation: {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
      })

      console.log("Document written with ID: ", docRef.id);

      setAddLocation({
        location: '',
        description: '',
      })

      toast.success('Entry added!')

    } catch (error) {
      console.log(error)
      toast.error('Could not find location')
    }

    fetchLocations()

  }

  const submitCoords = async (e) => {
    e.preventDefault()

    // testing useRef:
    // console.log(`testing: ${coordPopupRef.current.id}`)
    // console.log(`testing: ${coordPopupRef.current.className}`)
    // console.log(`testing: ${coordPopupRef.current.checked}`)


    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      )

      const data = await response.json()

      const docRef = await addDoc(collection(db, 'sites'), {
        location,
        city,
        country,
        description,
        geolocation: {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
      })

      console.log("Document written with ID: ", docRef.id);

      setAddLocation({
        location: '',
        city: '',
        country: '',
        description: '',
        lat: 0,
        lng: 0
      })


      coordPopupRef.current.checked = false
      toast.success('Entry added manually!')

    } catch (error) {
      console.log(error)
      toast.error('Invalid co-ordinates')
    }

    fetchLocations()

  }



  return (
    <div className="p-8">
      <div>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="grid grid-rows-2">
              <label className='self-end pb-1'>Dive Location</label>
              <input className="input input-bordered w-full max-w-xs" id='location' value={location} type="text" placeholder="Enter dive location here" onChange={onChange} />
            </div>
            <div className="grid grid-rows-2">
              <label className='self-end pb-1'>Brief description</label>
              <textarea className="textarea textarea-bordered" name="" id="description" value={description} placeholder="Enter a description here" onChange={onChange} />
            </div>
          </div>
          <button className="btn mt-12 mb-4" type='submit'>Submit</button>
        </form>


        <label htmlFor="coord-popup-modal" className="btn modal-button">Enter co-ordinates manually</label>


        <input ref={coordPopupRef} type="checkbox" id="coord-popup-modal" className="modal-toggle" />
        <label htmlFor="coord-popup-modal" className="modal cursor-pointer">
          <label className="modal-box relative">
            <label htmlFor="coord-popup-modal" className="btn btn-sm btn-circle absolute right-4 top-4">✕</label>
            <h3 className="text-lg font-bold mb-4">Enter co-ordinates manually:</h3>
            <form onSubmit={submitCoords}>
              <div className="grid grid-rows-2 mx-2">
                <label className='label label-text'>Dive Location</label>
                <input className='input input-bordered input-sm lg:input-sm w-full max-w-xs' id='location' value={location} type="text" onChange={onChange} />
              </div>
              <div className="grid grid-rows-2 mx-2">
                <label className='label label-text'>City or Region (or nearest)</label>
                <input className='input input-bordered input-sm w-full max-w-xs' id='city' value={city} type="text" onChange={onChange} />
              </div>
              <div className="grid grid-rows-2 mx-2">
                <label className='label label-text'>Country</label>
                <input className='input input-bordered input-sm w-full max-w-xs' id='country' value={country} type="text" onChange={onChange} />
              </div>

              <p className='badge badge-warning py-9 md:py-8 px-4 font-bold mt-6 mb-2'>For South and West values, please add the minus sign in front <br />(e.g. Longitude: -86.8515)</p>
              <div className="grid grid-rows-2 mx-2">
                <label className='label label-text'>Latitude</label>
                <input className='input input-bordered input-sm w-full max-w-xs' id='lat' value={lat} type="number" onChange={onChange} />
              </div>
              <div className="grid grid-rows-2 mx-2">
                <label className='label label-text'>Longitude</label>
                <input className='input input-bordered input-sm w-full max-w-xs' id='lng' value={lng} type="number" onChange={onChange} />
              </div>
              <div className="flex justify-between mt-4">
                <label htmlFor="description-modal" className="btn modal-button">+ description</label>
                <button className="btn" type='submit'>Submit</button>
              </div>
            </form>
          </label>
        </label>

        <input type="checkbox" id="description-modal" className="modal-toggle" />
        <label htmlFor="description-modal" className="modal cursor-pointer">
          <label className="modal-box max-h-5xl h-11/12">
            <h3 className="text-lg font-bold mb-4">Description:</h3>
            <textarea className="textarea textarea-bordered w-11/12" name="" id="description" value={description} onChange={onChange} />
            <div className="modal-action">
              <label htmlFor="description-modal" className="btn">Done!</label>
            </div>
          </label>
        </label>

      </div >
    </div >
  )
}

export default AddLocation