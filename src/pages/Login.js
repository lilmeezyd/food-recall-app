import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthenticationContext'

function Login() {
  
  const initialState = {email: '', password: ''}
  const [ data, setData ] = useState(initialState)
  const login = useAuth()

  const { email, password } = data

  useEffect(() => {
    !!login.message && setTimeout(() => {
      login.reset()
    }, 2000)
  
    return () => {
      
    }
  }, [login])
  const onSubmit = (e) => {
    e.preventDefault()
    login.login(email,password)
    setData(initialState)
  }

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }
  return (
    <div className='form-control'>
      <div className='login'>Login into Food Recall Tool</div>
      <form onSubmit={onSubmit}>{!!login.message &&
      <div role='alert' className='error-msg alert'>{login.message}</div>}
        <div className='form-group'>
          <label htmlFor="Email">Email</label>
          <input onChange={onChange} placeholder='Enter Email' id='email' name='email' value={email} type="email" />
        </div>
        <div className='form-group'>
          <label htmlFor="Password">Password</label>
          <input onChange={onChange} placeholder='Enter Password' id='password' name='password' value={password} type="password" />
        </div>
        <div className='form-group'>
          <button className='btn'>Login</button>
        </div>
      </form>
      <p><Link to="/request-password-reset">Forgot Password </Link> </p>
      <p>Don't have an account <Link to='/register'>Register</Link></p>
    </div>
  )
}

export default Login