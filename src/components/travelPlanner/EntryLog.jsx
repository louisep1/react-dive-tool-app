import { useContext } from 'react'
import EntryContext from '../../context/travelContext/EntryContext'
import EntryLogItems from './EntryLogItems'
import { AiFillPushpin } from "react-icons/ai";


const EntryLog = () => {
  const { dailyPlan, editPlan, tripName } = useContext(EntryContext)

  const sorted = dailyPlan.sort((a, b) => a.dayNumber - b.dayNumber)

  return (
    <div className='mt-20 w-10/12 text-center mx-auto'>
      <div className="mb-10 relative w-min mx-auto">
        <AiFillPushpin className='absolute text-xl top-1' />
        <h3 className='text-5xl m-4 px-2'>{tripName}</h3>
      </div>
      <div>
        {sorted.map((dayEntry) => {
          return (
            <EntryLogItems key={dayEntry.id} dayEntry={dayEntry} />
          )
        })}
      </div>
    </div>
  )
}


export default EntryLog