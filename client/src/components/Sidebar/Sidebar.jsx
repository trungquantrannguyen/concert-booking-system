import React, {useState} from 'react';
import './Sidebar.css';

function Sidebar({ openSidebarToggle }) {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <a href="/">ConcertLand</a>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className={`sidebar-list-item ${activeItem === 'concerts' ? 'active' : ''}`} onClick={() => handleItemClick('concerts')}>
                    <a href="/dbconcerts">
                        concerts
                    </a>
                </li>
                <li className={`sidebar-list-item ${activeItem === 'artists' ? 'active' : ''}`} onClick={() => handleItemClick('artists')}>
                    <a href="/dbartists">
                        artists
                    </a>
                </li>
                <li className={`sidebar-list-item ${activeItem === 'venues' ? 'active' : ''}`} onClick={() => handleItemClick('venues')}>
                    <a href="/dbvenues">
                        venues
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
