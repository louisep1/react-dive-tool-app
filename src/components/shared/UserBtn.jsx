import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';


function UserBtn() {
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()
  const auth = getAuth();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  }, [])


  const onClick = () => {
    loggedIn === false && navigate('/sign-in-up')
  }

  const signOut = () => {
    setLoggedIn(false)
    auth.signOut()

    toast.success('Logged out')
  }

  return (
    <div className="relative">
      <div className='absolute -top-12 -translate-y-3 lg:-translate-y-0 lg:-top-20 right-4'>
        <button className='btn rounded-full btn-sm lg:btn-md btn-primary p-2 lg:p-4' onClick={onClick}>{loggedIn ? `Welcome back, ${auth.currentUser.displayName !== null ? auth.currentUser.displayName : 'user'}` : 'Sign in/up'}</button>
        {loggedIn === true && <button onClick={signOut} className='absolute right-5 top-12'>Sign out</button>}
      </div>
    </div>
  )
}

export default UserBtn