import { GrLocationPin } from 'react-icons/gr'
import { MdLocationOn } from 'react-icons/md'

function LocationItem({ data }) {
  return (
    <>
      <div className="text-xl"><MdLocationOn className='inline' /> {data.location}{(data.city && data.city !== data.location) && ` - ${data.city}`}{data.country && `, ${data.country}`}</div>
    </>
  )
}

export default LocationItem