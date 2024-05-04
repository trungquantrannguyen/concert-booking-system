import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

import email_icon from './assets/email.png'
import password_icon from './assets/password.png'

function Login() {

  const history = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault();

    try{
      await axios.post("http://localhost:5173/login",{
        email,password
      })
      .then(res=>{
          if (res.data == 'User not found!'){
            alert('User not found!')
          }
          else if (res.data == 'Incorrect user or password'){
            alert('Incorrect user or password')
        }
          else{
            history('/home',{state:{id:email}})
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
          <img src={email_icon} alt=""/>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email address"/>
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
