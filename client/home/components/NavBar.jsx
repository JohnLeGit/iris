import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import irisLogo from '../assets/IRIS_logo_v1.png'
import irisName from '../assets/IRIS_name_v1.png'

function NavBar() {
    return (
        <nav className='navbar'>
            <div className="logo">
                <a href='/' className='site-logo'><img src={irisLogo} id = "iris-logo"/></a>
                <a href='/' className='site-title'><img src={irisName} id = "iris-logo"/></a>
            </div>

            <ul>
                <li>
                    <a href='/home'>Metrics</a>
                </li>
                <li>
                    <a href='/login'>Login</a>
                </li>
                <li>
                    <a href='/signup'>Signup</a>
                </li>
            </ul>
        </nav>
    )
}

// return (
// <div>
//     {/* <Link to={{
//           pathname: ,
//           state: 
//           }}></Link> */}
// </div>
// )

export default NavBar;