import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(true)

  const navigate = useNavigate()

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