import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Home from './pages/Home/Home';
import Concert from './pages/Concert/Concert';
import Artist from './pages/Artist';
import SignUp from './pages/SignUp/SignUp';
import Login from "./pages/Login/Login";
import Profile from './pages/Profile/Profile';
import DBConcerts from './pages/DashBoard/DBConcerts/DBConcerts';
import CreateConcert from './pages/DashBoard/DBConcerts/CreateConcert/CreateConcert';
import UpdateConcert from './pages/DashBoard/DBConcerts/UpdateConcert/UpdateConcert';
import DBArtists from './pages/DashBoard/DBArtists/DBArtists';
import CreateArtist from './pages/DashBoard/DBArtists/CreateArtist/CreateArtist';
import UpdateArtist from './pages/DashBoard/DBArtists/UpdateArtist/UpdateArtist';
import DBVenues from './pages/DashBoard/DBVenues/DBVenues';
import CreateVenue from './pages/DashBoard/DBVenues/CreateVenue/CreateVenue';
import UpdateVenue from './pages/DashBoard/DBVenues/UpdateVenue/UpdateVenue';
import Booking from './pages/Booking/Booking';
import ConfirmBooking from './pages/ConfirmBooking/ConfirmBooking'
import { StoreContext} from './context/StoreContext';

function App() {
  const { setToken, setID, 
          setUsername, setEmail, 
          setPhone, setGender, setDoB } = useContext(StoreContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token && userData) {
      setToken(token);
      setID(userData._id);
      setUsername(userData.username);
      setEmail(userData.email);
      setPhone(userData.phoneNumber);
      setGender(userData.gender);
      setDoB(userData.dob);
    }
  }, [setToken, setID, setUsername, setEmail, setPhone, setGender, setDoB]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concerts" element={<Concert />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dbconcerts" element={<DBConcerts />} />
          <Route path="/dbconcerts/create-concert" element={<CreateConcert />} />
          <Route path="/dbconcerts/edit-concert/:concertID" element={<UpdateConcert />} />
          <Route path="/dbartists" element={<DBArtists />} />
          <Route path="/dbartists/create-artist" element={<CreateArtist />} />
          <Route path="/dbartists/edit-artist/:artistID" element={<UpdateArtist />} />
          <Route path="/dbvenues" element={<DBVenues />} />
          <Route path="/dbvenues/create-venue" element={<CreateVenue />} />
          <Route path="/dbvenues/edit-venue/:venueID" element={<UpdateVenue />} />
          <Route path="/concerts/buy-ticket/:concertID" element={<Booking />} />
          <Route path="/confirmbooking" element={<ConfirmBooking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
