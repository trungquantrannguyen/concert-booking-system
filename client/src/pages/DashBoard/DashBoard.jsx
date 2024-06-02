import React, { useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar";
import { BsCalendarHeart, BsGem, BsPerson, BsDatabase} from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './DashBoard.css'

function DashBoard(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

    const data = [
        {
          name: 'Follow Again 2024',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'The Eras Tour 2024',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'The Odd Of Love',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'EXO Fan Meeting',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'aespa Showcase',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Be The Sun 2024',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Born Pink',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    return(
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <main className='main-container'>
                <div className='main-title'>
                    <h3>DashBoard</h3>
                </div>
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Concerts</h3>
                            <BsCalendarHeart className='card_icon'/>
                        </div>
                        <h1>8</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Artists</h3>
                            <BsGem className='card_icon'/>
                        </div>
                        <h1>12</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Customers</h3>
                            <BsPerson className='card_icon'/>
                        </div>
                        <h1>112</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>Transactions</h3>
                            <BsDatabase className='card_icon'/>
                        </div>
                        <h1>42</h1>
                    </div>
                </div>
                <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
            </main>
        </div>
    );
}
export default DashBoard;