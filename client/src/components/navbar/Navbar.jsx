import React, { useState } from "react"
import './Navbar.css'
import { Link } from "react-router-dom"

import logo from '../assets/logo.png'

function Navbar(){

    const [menu, setMenu] = useState("concerts");

    return(
        <div className="navbar">   
            <div className="nav-logo">
                <img src={logo} alt="ConcertBox" />
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("home")}><Link style={{textDecoration: 'none', color: 'black'}} to="/home">Home</Link>{menu==="home"?<h/>:<></>}</li>
                <li onClick={() => setMenu("concerts")}><Link style={{textDecoration: 'none', color: 'black'}} to="/concerts">Concerts</Link>{menu==="concerts"?<h/>:<></>}</li>
                <li onClick={() => setMenu("artists")}><Link style={{textDecoration: 'none', color: 'black'}} to="/artists">Artists</Link>{menu==="artists"?<h/>:<></>}</li>
            </ul>
            <div className="nav-login">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    );
}

export default Navbar

