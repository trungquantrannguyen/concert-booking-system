import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from "../components/navbar/Navbar";

function Home(){
  const location = useLocation()

  return (
    <>
        <Navbar/>
        <h1>Hello</h1>
        <h1>Welcome, {location.state.id}</h1>
    </>
  )
}
export default Home