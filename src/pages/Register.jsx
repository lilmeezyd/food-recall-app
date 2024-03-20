import {useState} from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [ data, setData ] = useState({
    email: '', password1: '', password2: '', firstName: '', lastName: ''
  })

  const { email, password1, password2, firstName, lastName } = data
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  const onChange = (e) => {
    setData((preveState) => ({
      ...preveState, [e.target.name]: e.target.value
    }))
  }
  return (
    <div className='form-control'>
      <div className='login'>Register to get email notifications</div>
      <form onSubmit={onSubmit}>
      <div className='form-group'>
          <label htmlFor="firstName">First Name</label>
          <input required onChange={onChange} placeholder='Enter First Name' id='firstName' name='firstName' value={firstName} type="text" />
        </div>
        <div className='form-group'>
          <label htmlFor="lastName">Last Name</label>
          <input required onChange={onChange} placeholder='Enter Last Name' id='lastName' name='lastName' value={lastName} type="text" />
        </div>
        <div className='form-group'>
          <label htmlFor="Password">Password</label>
          <input required onChange={onChange} placeholder='Enter Password' id='password1' name='password1' value={password1} type="password" />
        </div>
        <div className='form-group'>
          <label htmlFor="Password">Confirm Password</label>
          <input required onChange={onChange} placeholder='Enter Password' id='password2' name='password2' value={password2} type="password" />
        </div>
        <div className='form-group'>
          <button className='btn'>Register</button>
        </div>
      </form>
      <p>Already have an account <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Register