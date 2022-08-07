import { useContext } from 'react'
import DiveContext from '../../context/diveContext/DiveContext';

const DiveStats = () => {

  const { dives, fetchedDives } = useContext(DiveContext)

  const numberOfLocations = 0;

  if (fetchedDives.length > 0) {
    return (
      <div className='md:p-4'>
        <h1 className='text-center p-8 md:text-3xl text-2xl'>Dive Stats</h1>
        <div className="grid grid-cols-2 rounded-lg shadow text-center lg:grid-cols-4">
          <div className="stat lg:border-r-2">
            <div className='stat-title lg:text-md text-sm whitespace-normal'>Total dives:</div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{fetchedDives.length}</div>
          </div>
          <div className="stat lg:border-r-2">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Total time underwater:</div>
            <div className='stat-value lg:text-4xl sm:text-xl text-lg'>{fetchedDives.length === 1 ? fetchedDives[0].diveTime : fetchedDives.reduce((a, b) => +a + +b.diveTime, 0)} mins</div>
          </div>
          <div className="stat lg:border-r-2">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Max depth to date: </div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{fetchedDives.length > 1 ? fetchedDives.sort((a, b) => +b.depth - +a.depth)[0].depth : fetchedDives[0].depth}m</div>
          </div>
          <div className="stat">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Longest time to date:</div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{fetchedDives.length > 1 ? fetchedDives.sort((a, b) => +b.diveTime - +a.diveTime)[0].diveTime : fetchedDives[0].diveTime} mins</div>
          </div>

        </div>
      </div>
    )
  } else if (dives.length > 0) {
    return (
      <div className='md:p-4'>
        <h1 className='text-center p-8 md:text-3xl text-2xl'>Dive Stats</h1>
        <div className="grid grid-cols-2 rounded-lg shadow text-center lg:grid-cols-4">
          <div className="stat lg:border-r-2">
            <div className='stat-title lg:text-md text-sm whitespace-normal'>Total dives:</div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{dives.length}</div>
          </div>
          <div className="stat lg:border-r-2">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Total time underwater:</div>
            <div className='stat-value lg:text-4xl sm:text-xl text-lg'>{dives.length === 1 ? dives[0].diveTime : dives.reduce((a, b) => +a + +b.diveTime, 0)} mins</div>
          </div>
          <div className="stat lg:border-r-2">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Max depth to date: </div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{dives.length > 1 ? dives.sort((a, b) => +b.depth - +a.depth)[0].depth : dives[0].depth}m</div>
          </div>
          <div className="stat">
            <div className="stat-title lg:text-md text-sm whitespace-normal">Longest time to date:</div>
            <div className="stat-value lg:text-4xl sm:text-xl text-lg">{dives.length > 1 ? dives.sort((a, b) => +b.diveTime - +a.diveTime)[0].diveTime : dives[0].diveTime} mins</div>
          </div>

        </div>
      </div>
    )
  } else {
    return (<p className='text-center my-16 mx-auto py-2 px-4 w-max font-bold bg-warning rounded'>No dives on record</p>)
  }
}

export default DiveStats