import { DiveProvider } from '../context/diveContext/DiveContext';
import Header from '../components/shared/Header';
import DiveLogForm from '../components/diveLog/DiveLogForm';
import DiveStats from '../components/diveLog/DiveStats'
import DiveLog from '../components/diveLog/DiveLog';
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";


function DiveLogPage() {
  const [pendingFetch, setPendingFetch] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    let isMounted = true
    onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [])

  return (
    <DiveProvider>
      <div className="container mx-auto">

        {/*　if I had been able to get the log in feature to work, I would have added this: */}


        {!loggedIn && (
          <div className="lg:px-10 mt-6">
            <div className="alert shadow-lg mb-4 px-2 lg:mb-10 lg:px-10">
              <div className='mx-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className='text-sm lg:text-md'>You are not logged in. If you leave or refresh the page, your logs will disappear.</span>
              </div>
            </div>
          </div>
        )}


        <Header title='Dive Log' />
        <DiveLogForm pendingFetch={pendingFetch} setPendingFetch={setPendingFetch} />
        <DiveStats />
        <DiveLog pendingFetch={pendingFetch} setPendingFetch={setPendingFetch} />
      </div>
    </DiveProvider>
  )
}

export default DiveLogPage