import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

import user_icon from './assets/user.png'
import password_icon from './assets/password.png'

function Login() {

  const navigate = useNavigate()

  const [username, setUser] = useState()
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault();

    try{
      await axios.post("http://localhost:3000/api/user/signin",{
        username,password
      })
      .then(res=>{
          console.log(res)
          if (res.status === 404 || res.data === 'User not found!'){
            alert('User not found!')
          }
          else if (res.status === 401 || res.data === 'Incorrect user or password'){
            alert('Incorrect user or password')
        }
          else{
            navigate('/concerts')
          }
      })
      .catch(e=>{
          alert('Wrong inputs!')
          console.log(e)
      })
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <form className='inputs' action='POST'>
        <div className='input'>
          <img src={user_icon} alt=""/>
          <input type="text" onChange={(e)=>{setUser(e.target.value)}} placeholder="User name"/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
        </div>
        <div className='forgot-password'>Lost Password? <span> Click Here!</span></div>
        <div className='submit-container'>
          <input type='submit' className='submit' onClick={submit} value='Login'/>
          <Link to="/signup" style={{textDecoration: 'none'}}><input type='submit' className='submit' value='Sign Up'/></Link>
        </div>
      </form>
    </div>
  )
}

export default Login
