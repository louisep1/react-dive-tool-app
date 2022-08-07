import Spinner from '../components/shared/Spinner'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


function SignInUp() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [signMethod, setSignMethod] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: ''
  })

  const { email, password, name } = user

  const navigate = useNavigate()
  const auth = getAuth();

  useEffect(() => {
    let isMounted = true
    onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        if (user) {
          // User is signed in.
          setLoggedIn(true)
        } else {
          // No user is signed in.
          setLoggedIn(false)
        }
      }
    });
    setLoading(false)
    return () => {
      isMounted = false;
    };
  }, [])



  const onChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value
    })
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(auth)

    if (signMethod === 'up') {
      try {
        const userCrendential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCrendential.user;

        updateProfile(auth.currentUser, {
          displayName: name
        })

        toast.success('Account created!')

        navigate(-1)

      } catch (error) {
        console.log(error.code)
        console.log(error.message)
        toast.error(`Email and/or password invalid`)
      }
    }

    if (signMethod == 'in') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        toast.success('Logged in!')

        navigate(-1)

      } catch (error) {
        console.log(error.code);
        console.log(error.message);
        toast.error(`Please check the login details`)
      }
    }
  }

  const setSign = (e) => {
    e.target.id === 'in' ? setSignMethod('in') : setSignMethod('up')
  }


  return (
    <>
      <div className="flex flex-col gap-2 items-center min-h-screen">
        {loading ? <div>loading...</div> :
          loggedIn ? <div className='pb-4 pb-6'>You are ALREADY logged in...</div> :
            <>
              <div className='pb-4 pb-6'>You are not currently signed in...</div>
              <label id='up' onClick={setSign} htmlFor="modal-sign" className="btn btn-secondary modal-button">Sign up here</label>
              <label id='in' onClick={setSign} htmlFor="modal-sign" className="btn modal-button">Already have an account?</label>
            </>
        }
      </div>

      <input type="checkbox" id="modal-sign" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label onClick={() => setSignMethod('')} htmlFor="modal-sign" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{signMethod === 'up' ? 'Sign up' : 'Sign in'}</h3>
          <p className="py-4">{signMethod === 'up' ? 'Please enter your details' : 'Enter your log in details'}</p>
          <form onSubmit={onSubmit} className='grid gap-4'>
            {signMethod === 'up' && <input className='p-1' type="text" name="" id="name" value={name} placeholder='Name' onChange={onChange} />}
            <input className='p-1' type="text" name="" id="email" value={email} placeholder='Email' onChange={onChange} />
            <input className='p-1' type="password" name="" id="password" value={password} placeholder={`Password ${signMethod === 'up' ? '(minimum six characters)' : ''}`} onChange={onChange} />
            <button type='submit' className={`btn ${signMethod === 'up' && 'btn-secondary'}`}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignInUp