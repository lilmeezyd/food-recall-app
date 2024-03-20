import React from 'react'

function Profile() {
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
                        <form>
                            <div className='form-group'>
                                <label htmlFor="firstName">First Name</label>
                                <input required placeholder='Enter First Name' id='firstName' name='email' type="text" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName">Last Name</label>
                                <input required placeholder='Enter Last Name' id='lastName' name='lastName' type="password" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName">Email</label>
                                <div className='email'>denismoini09@gmail.com</div>
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
                        <form>
                            <div className='form-group'>
                                <label htmlFor="oldPassword">Old Password</label>
                                <input required placeholder='Enter Old Password' id='oldPassword' name='oldPassword' type="password" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="newPassword">New Password</label>
                                <input required placeholder='Enter New Password' id='newPassword' name='newPassword' type="password" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="newPassword1">Confirm New Password</label>
                                <input required placeholder='Confirm New Password' id='newPassword1' name='newPassword1' type="password" />
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
                        <form>
                            <div className='form-group options-group'>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div>
                                    <label htmlFor="All">All</label>
                                </div>
                            </div>
                            <div className='form-group options-group'>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div>
                                    <label htmlFor="FSIS">FSIS</label>
                                </div>
                            </div>
                            <div className='form-group options-group'>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div>
                                    <label htmlFor="FDA">FDA</label>
                                </div>
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