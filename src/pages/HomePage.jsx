import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="card bg-primary text-primary-content my-4 mx-10">
      <div className="card-body">
        <h1 className='pb-8 pt-2 text-center text-4xl font-bold underline'>Welcome Home</h1>
        <p className="text-center text-2xl">This app was built as a tool to assist the needs of divers</p>
        <p className="text-center text-2xl">The following tools have been included:</p>
        <i className="text-center">(in order of most recent)</i>
        <ul className="text-center text-xl py-4">
          <li className='leading-none'><Link to='/dive-map'>Dive Sites Map</Link><br /><i className='text-sm'>(still under construction)</i></li>
          <li><Link to='/weather'>Weather Forecast</Link></li>
          <li><Link to='/dive-log'>Dive Logs</Link></li>
          <li className='leading-none pt-1'><Link to='/travel-planner'>Trip Planner</Link><br /><i className='text-sm leading-none'>(removed from nav bar as least useful/impressive)</i></li>
        </ul>
        <p className="text-center text-2xl">Please feel free to make use of these pages</p>
      </div>
    </div>
  )
}

export default HomePage