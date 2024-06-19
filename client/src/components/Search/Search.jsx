import React from "react";
import './Search.css';

function Search() {
    return (
        <div className="container-fluid">
            <div id="search-container">
                <form className="search-form">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-search" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Search;
