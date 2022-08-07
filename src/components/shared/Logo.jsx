import { GiBigWave } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to=''>
      <div className="p-4 outline w-38">
        <GiBigWave className='text-6xl' />
        <h1 className='text-cyan-500 font-bold'>DIVE TOOL </h1>
      </div>
    </Link>
  )
}

export default Logo