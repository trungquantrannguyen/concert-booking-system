import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';
import FeaturedEvents from '../../components/FeaturedEvents/FeaturedEvents';

function Home(){

  return (
    <>
        <Navbar/>
        <Search/>
        <FeaturedEvents/>
        
    </>
  )
}
export default Home