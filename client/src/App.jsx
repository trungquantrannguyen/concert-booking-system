import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Concert from './pages/Concert';
import Artist from './pages/Artist';
import SignUp from './pages/SignUp/SignUp';
import Login from "./pages/Login/Login";
import Profile from './pages/Profile/Profile';
import DBConcerts from './pages/DashBoard/DBConcerts/DBConcerts';
import Cart from './pages/Cart/Cart';
import ConfirmBooking from './pages/ConfirmBooking/ConfirmBooking';

function App() {
  return(
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/concerts" element={<Concert/>}/>
      <Route path="/artists" element={<Artist/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/dbconcerts" element={<DBConcerts/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/confirmbooking" element={<ConfirmBooking/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App
