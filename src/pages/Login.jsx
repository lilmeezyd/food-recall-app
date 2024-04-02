import {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthenticaticationContext } from '../AuthenticationContext'

function Login() {
  
  const initialState = {email: '', password: ''}
  const [ data, setData ] = useState(initialState)
  const navigate = useNavigate()
  const login = useContext(AuthenticaticationContext)

  const { email, password } = data
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
      <div className='login'>Login into Food Recall App</div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="Email">Email</label>
          <input required onChange={onChange} placeholder='Enter Email' id='email' name='email' value={email} type="text" />
        </div>
        <div className='form-group'>
          <label htmlFor="Password">Password</label>
          <input required onChange={onChange} placeholder='Enter Password' id='password' name='password' value={password} type="password" />
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