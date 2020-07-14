import React from 'react'
import logo from '../img/logo.png'

function Header() {
    return (
        <a href="/">
            <img className='nav-img' src={logo} alt='' />
        </a>
    )
}

export default Header
