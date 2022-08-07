import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(true)

  const navigate = useNavigate()

  // NEED TO FIND A WAY TO CHECK THIS:
  // this is in case someone tries to manually type this url into the address bar
  useEffect(() => {
    if (loggedIn === false) {
      navigate('/sign-in-up')
    }
  }, [])


  return (
    <>
      <div>Account</div>
      <div>under construction...</div>
    </>
  )
}

export default AccountPage