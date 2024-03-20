import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import chevronDown from '../static/chevron-down.svg'
import chevronUp from '../static/chevron-up.svg'

function Header() {

    const [viewMobile, setViewMobile] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const onToggle = () => {
        setViewMobile(prevState => !prevState)
    }
    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">FRA</Link>
            </div>
            <ul className="main-menu">
                <li>
                    <Link onClick={() => setDropDown(!dropDown)}>Recalls
                        {dropDown ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</Link>
                    {dropDown && <ul className='recalls'>
                        <li><Link onClick={() => setDropDown(false)} to='/recalls/fda'>FDA</Link></li>
                        <li><Link onClick={() => setDropDown(false)} to='/recalls/usda'>USDA</Link></li>
                    </ul>}
                </li>
                <li>
                    <Link onClick={() => setDropDown(false)} to='/api-provider'>Api Provider</Link>
                </li>
                <li>
                    <Link onClick={() => setDropDown(false)} to='/about-us'>About Us</Link>
                </li>
                <li>
                    <Link onClick={() => setDropDown(false)} to='/profile'>Profile</Link>
                </li>
                {!loggedIn && <li>
                    <Link to='/login' onClick={() => {
                        setDropDown(false)
                        setLoggedIn(true)
                    }}>Login</Link>
                </li>}
                {!loggedIn && <li>
                    <Link onClick={() => setDropDown(false)} to='/register'>Register</Link>
                </li>}
                {loggedIn && <li>
                    <Link to='/' onClick={() => {
                        setDropDown(false)
                        setLoggedIn(false)
                    }}>Log Out</Link>
                </li>}
            </ul>
            <div onClick={onToggle} className="burger-housing">
                <div className="burger-container">
                    <div className="burger-line"></div>
                    <div className="burger-line-1"></div>
                    <div className="burger-line-2"></div>
                </div>
            </div>

            {viewMobile && <ul className="mobile-menu">
                <li>
                    <Link onClick={() => setDropDown(!dropDown)}>Recalls
                        {dropDown ? <img src={chevronUp} alt="chevron-up" /> : <img src={chevronDown} alt="chevron-down" />}</Link>
                    {dropDown && <ul className='recalls'>
                        <li><Link onClick={() => {
                            setViewMobile(false)
                            setDropDown(false)
                        }} to='/recalls/fda'>FDA</Link></li>
                        <li><Link onClick={() => {
                            setViewMobile(false)
                            setDropDown(false)
                        }} to='/recalls/usda'>USDA</Link></li>
                    </ul>}
                </li>
                <li>
                    <Link onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                    }} to='/api-provider'>Api Provider</Link>
                </li>
                <li>
                    <Link onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                    }} to='/about-us'>About Us</Link>
                </li>
                <li>
                    <Link onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                    }} to='/profile'>Profile</Link>
                </li>

                {!loggedIn && <li>
                    <Link to='/' onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                        setLoggedIn(true)
                    }}>Login</Link>
                </li>}
                {!loggedIn && <li>
                    <Link onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                    }} to='/register'>Register</Link>
                </li>}
                {loggedIn && <li>
                    <Link to='/' onClick={() => {
                        setViewMobile(false)
                        setDropDown(false)
                        setLoggedIn(false)
                    }}>Log Out</Link>
                </li>}
            </ul>}

        </header>
    )
}

export default Header