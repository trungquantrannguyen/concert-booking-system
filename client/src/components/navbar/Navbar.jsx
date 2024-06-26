import React, { useContext, useState } from "react";
import './Navbar.css';
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";


function Navbar() {
    const navigate = useNavigate();
    const { token, setToken, username, _id } = useContext(StoreContext);
    const adminID1 = '6635da61e971629ba91e4a6d'
    const adminID2 = '663733901d8699553b351e6a'

    async function handleLogout(e) {
        e.preventDefault();

        try {
            await axios.get("http://localhost:3000/api/user/signout")
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setToken(null);
                        localStorage.setItem("token", null);
                        localStorage.removeItem("user");
                        navigate('/');
                    }
                });
        }
        catch (e) {
            console.log(e);
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
                    <div className="navbar-nav me-auto">
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/concerts">concerts</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/artists">artists</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/venues">venues</NavLink>
                        </div>
                    </div>
                    <div className="navbar-nav ms-auto">
                        {!token ?
                            <>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/login">login</NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/signup">sign up</NavLink>
                                </div>
                            </>
                            : <>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/profile">{username}'s profile</NavLink>
                                </div>
                                {(_id === adminID1 || _id === adminID2) && (
                                    <div className="nav-item">
                                        <NavLink className="nav-link" to="/dbconcerts">dashboard</NavLink>
                                    </div>
                                )}
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

export default Navbar;
