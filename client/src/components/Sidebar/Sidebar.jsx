import React from 'react'
import { BsFire, BsCalendarHeart, BsClipboard2Data, BsGem, BsPerson, BsDatabase, BsGear, BsCardText } from 'react-icons/bs';
import './Sidebar.css'

function Sidebar({openSidebarToggle, OpenSidebar}){
    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsFire className='icon_header'/> 
                    ConcertBox
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}> 
                    X 
                </span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsClipboard2Data className='icon'/>
                        DashBoard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsCalendarHeart className='icon'/>
                        Concerts
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsGem className='icon'/>
                        Artists
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsPerson className='icon'/>
                        Customers
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsDatabase className='icon'/>
                        Transactions
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsCardText className='icon'/>
                        Reports
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BsGear className='icon'/>
                        Setting
                    </a>
                </li>
            </ul>
            
        </aside>
    );
}

export default Sidebar;