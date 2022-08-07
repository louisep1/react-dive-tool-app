import { Link } from 'react-router-dom'
import Logo from './Logo';

function NavBar() {
  return (




    <div>
      <nav className='flex justify-between lg:justify-start gap-5 p-4'>
        <Logo />
        <div className='hidden lg:flex p-5 gap-5 h-max'>
          {/*  w-full justify-between */}
          <Link to=''>Home</Link>
          <Link to='/dive-log'>Dive Logs</Link>
          {/* <Link to='/travel-planner'>Trip Planner</Link> */}
          <Link to='/weather'>Weather Forecast</Link>
          <Link to='/dive-map'>Dive Sites Map</Link>
        </div>

        {/* Mobile nav: */}
        <div>
          <div className="dropdown dropdown-end lg:hidden pt-2 pr-2 z-[500]">
            <label tabIndex="0" className="btn m-1">Menu</label>
            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to=''>Home</Link></li>
              <li><Link to='/dive-log'>Dive Logs</Link></li>
              {/* <li><Link to='/travel-planner'>Trip Planner</Link></li> */}
              <li><Link to='/weather'>Weather Forecast</Link></li>
              <li><Link to='/dive-map'>Dive Sites Map</Link></li>
            </ul>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default NavBar