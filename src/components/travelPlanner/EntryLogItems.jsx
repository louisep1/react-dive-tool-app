import { useContext } from "react"
import EntryContext from '../../context/travelContext/EntryContext'
import { FaTimes, FaEdit } from 'react-icons/fa'


const EntryLogItems = ({ dayEntry }) => {
  const { editPlan, deletePlan } = useContext(EntryContext)


  return (
    <div className="card mx-auto my-6 w-11/12 lg:w-6/12 bg-accent text-secondary-content" key={dayEntry.id}>
      <div className="card-body">
        <button className='absolute top-4 right-9 pl-2 p-1 btn btn-xs btn-shadow' onClick={() => editPlan(dayEntry)}><FaEdit /></button>
        <button className='absolute top-4 right-3 p-1 btn btn-xs btn-shadow' onClick={() => deletePlan(dayEntry.id)}><FaTimes /></button>

        <p className="card-title">Day {dayEntry.dayNumber} - {dayEntry.date}</p>
        <div className="">
          <p className="">Location:</p>
          <p className="">{dayEntry.location}</p>
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{dayEntry.plan}</p>
      </div>
    </div>
  )
}

export default EntryLogItems