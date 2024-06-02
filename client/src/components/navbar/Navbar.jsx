import React, { useState } from "react"
import './Navbar.css'
import {useNavigate } from "react-router-dom"

function Navbar(){
    const navigate = useNavigate()

    return(
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    ConcertBox
                </a>
                <button 
                    class="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" aria-current="page" href="/concerts">
                            Concerts
                        </a>
                        <a class="nav-link" href="/artists">
                            Artists
                        </a>
                        <a class="nav-link" href="/login">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar

