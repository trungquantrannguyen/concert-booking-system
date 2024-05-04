import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

import user_icon from './assets/user.png'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'
import date_icon from './assets/date.png'
import phone_icon from './assets/phone.png'
import gender_icon from './assets/gender.png'

function SignUp() {

  const history = useNavigate()

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDoB] = useState('')


  async function submit(e){
    e.preventDefault();

    try{
      await axios.post("http://localhost:5173/signup",{
        email,password,phone,gender,dob
      })
      .then(res=>{
          if (res.data == 'User created successfully'){
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
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <form className='inputs' action='POST'>
      <div className='input'>
        <img src={user_icon} alt=""/>
          <input type="text" onChange={(e)=>{setUser(e.target.value)}} placeholder="User name"/>
        </div>
        <div className='input'>
        <img src={email_icon} alt=""/>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email address"/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=""/>
          <input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
        </div>
        <div className='input'>
          <img src={phone_icon} alt=""/>
          <input type='tel' onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone number"/>
        </div>
        <div className='input'>
          <img src={gender_icon} alt=""/>
          <select name='gender' onSelect={(e)=>{setGender(e.target.value)}} placeholder="Gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='input'>
          <img src={date_icon} alt=""/>
          <input type='date' onChange={(e)=>{setDoB(e.target.value)}} placeholder="Date of birth"/>
        </div>
        <div className='submit-container'>
        <input type='submit' className='submit' onClick={submit} value='Sign Up'/>
        </div>
      </form>
    </div>
  )
}

export default SignUp
