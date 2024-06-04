import React, { useState } from "react"
import './Navbar.css'
import { useNavigate, NavLink } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

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
                            <div className="nav-item">
                                <NavLink className="nav-link" to="/login">login</NavLink>
                            </div>
                            <div className="nav-item">
                                <NavLink className="nav-link" to="/signup">signup</NavLink>
                            </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar

