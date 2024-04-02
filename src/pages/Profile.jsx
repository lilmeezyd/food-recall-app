import { useState} from 'react'
import { useAuth } from '../AuthenticationContext'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const user = useAuth()
    const [data, setData] = useState({
        firstName: user?.profile?.firstName || '', 
        lastName: user?.profile?.lastName || ''
    })
    const [passwords, setPasswords ] = useState({
        oldPassword: '', newPassword: '', confirmPassword: ''
    })

    const [ notifications, setNotifications ] = useState(
        {fda: user?.profileNotify?.fda || false, 
        usda: user?.profileNotify?.usda || false})

    const { firstName, lastName } = data
    const { oldPassword, newPassword, confirmPassword } = passwords
    const { fda, usda } = notifications

    const navigate = useNavigate()

    const onChangeDetails = (e) => {
        setData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onChangePassword = (e) => {
        setPasswords(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onChangeNotifications = (e) => {
        console.log(e.target)
        setNotifications(prevState => ({
            ...notifications, [e.target.name]: e.target.checked
        }))
    }

    const submitDetails = (e) => {
        e.preventDefault()
        user.updateDetails(firstName, lastName)
        navigate('/')
    }

    const submitPassword = (e) => {
        e.preventDefault()
        user.newPassword(oldPassword, newPassword, confirmPassword)
        setPasswords({
            oldPassword: '', newPassword: '', confirmPassword: ''
        })
        navigate('/')
    }

    const submitNotifications = (e) => {
        e.preventDefault()
        user.changeNotifications(fda, usda)
        navigate('/')
    }
    return (
        <>
            <div className="form-control">
                <div className='form-profile'>
                    <div className='profile-heading'>Profile</div>
                </div>
            </div>
            <div className='profile'>
                <div className="form-control">
                    <div className='form-profile'>
                        <div className="profile-heading-1">Edit Details</div>
                        <form onSubmit={submitDetails}>
                            <div className='form-group'>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                onChange={onChangeDetails}
                                 required placeholder='Enter First Name' id='firstName' name='firstName' value={firstName} type="text" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                onChange={onChangeDetails}
                                 required placeholder='Enter Last Name' id='lastName' name='lastName' value={lastName} type="text" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName">Email</label>
                                <div className='email'>{user?.profile?.email}</div>
                            </div>
                            <div className='form-group'>
                                <button className='btn'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="form-control">
                    <div className='form-profile'>
                        <div className="profile-heading-1">Change Password</div>
                        <form onSubmit={submitPassword}>
                            <div className='form-group'>
                                <label htmlFor="oldPassword">Old Password</label>
                                <input 
                                onChange={onChangePassword}
                                required placeholder='Enter Old Password' id='oldPassword' name='oldPassword' value={oldPassword} type="password" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                onChange={onChangePassword}
                                 required placeholder='Enter New Password' id='newPassword' name='newPassword' value={newPassword} type="password" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                onChange={onChangePassword}
                                 required placeholder='Confirm New Password' id='confirmPassword' name='confirmPassword' value={confirmPassword} type="password" />
                            </div>
                            <div className='form-group'>
                                <button className='btn'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="form-control">
                    <div className='form-profile'>
                        <div className="profile-heading-1">Email Notifications</div>
                        <form onSubmit={submitNotifications}>
                            <div>
                            <div className='form-group options-group'>
                                <div>
                                    <input 
                                    checked={usda}
                                    onChange={onChangeNotifications} type="checkbox" name="usda" id="usda" />
                                </div>
                                <div>
                                    <label htmlFor="USDA">USDA</label>
                                </div>
                            </div>
                            <div className="foot-note-notify">
                                Get notifications from the USDA Food Safety and Inspection Service
                                </div>
                            </div>
                            <div>
                            <div className='form-group options-group'>
                                <div>
                                    <input
                                    checked={fda}
                                    onChange={onChangeNotifications}
                                    type="checkbox" name="fda" id="fda" />
                                </div>
                                <div>
                                    <label htmlFor="FDA">FDA</label>
                                </div>
                            </div>
                            
                            <div className="foot-note-notify">Get notifications from the Food and Drug Administration</div>
                            </div>
                            <div className='form-group'>
                                <button className='btn'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile