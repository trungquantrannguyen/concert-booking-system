import React, { useState } from "react"
import './Search.css'

function Search(){

    return(
        <div className="container-fluid" id="search-container">
            <form className="d-flex" role="search">
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                />
                <button className="btn-search" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search