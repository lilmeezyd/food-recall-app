import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const [ viewMobile, setViewMobile ] = useState(false)
    const [ loggedIn, setLoggedIn ] = useState(false)

    const onToggle = () => {
        setViewMobile(prevState => !prevState)
    }

    const loginIn = () => {
        setLoggedIn(true)
    }

    const logOut = () => {
        setLoggedIn(false)
    }
    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">FRP</Link>
            </div>
            <ul className="main-menu">
                <li>
                    <Link to='/recalls'>Recalls</Link>
                </li>
                <li>
                    <Link to='/api-provider'>Api Provider</Link>
                </li>
                <li>
                    <Link to='/about-us'>About Us</Link>
                </li>
                {!loggedIn && <li>
                    <Link to='/login' onClick={() => setLoggedIn(true)}>Login</Link>
                </li>}
                {!loggedIn && <li>
                    <Link to='/register'>Register</Link>
                </li>}
                {loggedIn && <li>
                    <Link to='/' onClick={() => setLoggedIn(false)}>Log Out</Link>
                </li>}
            </ul>
            <div onClick={onToggle} className="burger-housing">
                <div className="burger-container">
                    <div className="burger-line"></div>
                    <div className="burger-line-1"></div>
                    <div className="burger-line-2"></div>
                </div>
            </div>

            {viewMobile && <ul onClick={onToggle} className="mobile-menu">
                <li>
                    <Link to='/recalls'>Recalls</Link>
                </li>
                <li>
                    <Link to='/api-provider'>Api Provider</Link>
                </li>
                <li>
                    <Link to='/about-us'>About Us</Link>
                </li>
                
                {!loggedIn && <li>
                    <Link to='/login' onClick={() => setLoggedIn(true)}>Login</Link>
                </li>}
                {!loggedIn && <li>
                    <Link to='/register'>Register</Link>
                </li>}
                {loggedIn && <li>
                    <Link to='/' onClick={() => setLoggedIn(false)}>Log Out</Link>
                </li>}
            </ul>}

        </header>
    )
}

export default Header