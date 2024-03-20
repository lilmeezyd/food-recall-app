import {useState} from 'react'
import { Link } from 'react-router-dom'

function Login() {
  
  const [ data, setData ] = useState({
    email: '', password: ''
  })

  const { email, password } = data
  const onSubmit = (e) => {
    e.preventDefault()
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
      <p>Don't have an account <Link to='/register'>Register</Link></p>
    </div>
  )
}

export default Login