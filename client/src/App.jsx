import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Concert from './pages/Concert';
import Artist from './pages/Artist';
import SignUp from './pages/Login_SignUp/SignUp';
import Login from "./pages/Login_SignUp/Login";

function App() {
  return(
    <>
    <Router>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/concerts" element={<Concert/>}/>
      <Route path="/artists" element={<Artist/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App
