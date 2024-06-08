import React, { useContext, useState } from "react"
import './Navbar.css'
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"
import { StoreContext } from "../../context/StoreContext"

function Navbar() {
    const navigate = useNavigate()
    const { token, setToken, username } = useContext(StoreContext)
    async function handleLogout(e) {
        e.preventDefault();
    
        try {
          await axios.get("http://localhost:3000/api/user/signout")
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                setToken(null);
                localStorage.setItem("token", null);
                navigate('/')
              }
            })
        }
        catch (e) {
          console.log(e)
        }
      }
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    ConcertLand
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/concerts">concerts</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/artists">artists</NavLink>
                        </div>
                        {!token ?
                            <><div className="nav-item">
                                <NavLink className="nav-link" to="/login">login</NavLink>
                            </div><div className="nav-item">
                                    <NavLink className="nav-link" to="/signup">signup</NavLink>
                                </div></>
                        : <>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Welcome, {username}!</NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/" onClick={handleLogout}>logout</NavLink>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar

