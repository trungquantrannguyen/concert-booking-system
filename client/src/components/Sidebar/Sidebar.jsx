import React from 'react'
import './Sidebar.css'

function Sidebar({openSidebarToggle, OpenSidebar}){
    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                <a href='/'>
                ConcertLand
                    </a>
                </div>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href='/dbconcerts'>
                        Concerts
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        Artists
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        Venues
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        Transactions
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        Reports
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        Setting
                    </a>
                </li>
            </ul>
            
        </aside>
    );
}

export default Sidebar;