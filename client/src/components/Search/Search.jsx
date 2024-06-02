import React, { useState } from "react"
import './Search.css'

function Search(){

    return(
        <div class="container-fluid" id="search-container">
            <form class="d-flex" role="search">
                <input 
                    class="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                />
                <button class="btn" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search