// !! maybe I fixed it
// https://firebase.google.com/docs/auth/web/manage-users#web-version-9
// https://stackoverflow.com/questions/62607608/firebase-cannot-read-property-uid-of-null


import DiveLogItem from './DiveLogItem'
import { useContext, useEffect, useState } from 'react'
import DiveContext from '../../context/diveContext/DiveContext'

import Spinner from '../shared/Spinner'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase.config'
import { getAuth, onAuthStateChanged } from "firebase/auth";


function DiveLog({ pendingFetch, setPendingFetch }) {
  const { dives, dispatch, fetchedDives } = useContext(DiveContext)

  const [loading, setLoading] = useState(true)
  // const [fetchedDives, setFetchedDives] = useState([])
  // i would like to add this to context if possible


  const auth = getAuth()

  const fetchDives = async (id) => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, "logs"), where("userRef", "==", id)))
      const divesArray = []
      querySnapshot.forEach((doc) => {
        divesArray.push({ ...doc.data(), id: doc.id })
      })
      // console.log('dives array', divesArray)
      // setFetchedDives(divesArray)
      dispatch({ type: 'SET_FETCHED_DIVES', payload: divesArray })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isMounted) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          fetchDives(uid)
        }
      } else {
        dispatch({ type: 'SET_FETCHED_DIVES', payload: [] })
        setLoading(false)
      }
    });
    setPendingFetch(false)

    // this doesn't make an awful lot of sense but this isMounted is supposed to fix the error
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    // https://www.loginradius.com/blog/engineering/how-to-fix-memory-leaks-in-react/
    return () => {
      isMounted = false;
    };
  }, [pendingFetch])



  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      <div className='py-8'>
        <div className='p-8 text-center text-3xl'>Dive Log</div>
        <div className='grid justify-center justify-items-center xl:grid-cols-3 items-start lg:grid-cols-2'>
          {/* not sure if this justify-center is neccessary... */}
          {!loading && fetchedDives.length > 0 ?
            fetchedDives.sort((a, b) => +a.log - +b.log).map((item, i) => (
              <DiveLogItem pendingFetch={pendingFetch} setPendingFetch={setPendingFetch} key={i} item={item} />
            )) :
            dives.length !== 0 ?
              dives.sort((a, b) => +a.log - +b.log).map((item, i) => (
                <DiveLogItem pendingFetch={pendingFetch} setPendingFetch={setPendingFetch} key={i} item={item} />
              ))
              : <h1 className='absolute'>No logs to show</h1>}
        </div>
      </div>

    </div>
  )
}

export default DiveLog

