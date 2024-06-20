import React, { useContext, useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function Login() {

  const navigate = useNavigate()

  const { username, setUsername,
    password, setPassword,
    setToken, setID,
    setEmail, setPhone,
    setGender, setDoB } = useContext(StoreContext)

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user/signin", {
        username: username,
        password: password
      })
        .then(res => {
          console.log(res)
          if (res.status === 404 || res.data === 'User not found!') {
            alert('User not found!')
          }
          else if (res.status === 401 || res.data === 'Incorrect user or password') {
            alert('Incorrect user or password')
          }
          else if (res.status === 200) {
            const userData = res.data.rest;
            setToken(res.data.token)
            setID(res.data.rest._id)
            setUsername(res.data.rest.username)
            setEmail(res.data.rest.email)
            setPhone(res.data.rest.phoneNumber)
            setGender(res.data.rest.gender)
            setDoB(res.data.rest.dob)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(userData));
            document.cookie = `access_token=${res.data.token}`
            navigate('/')
          }
        })
        .catch(e => {
          alert('Wrong inputs!')
          console.log(e)
        })
    }
    catch (e) {
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
          <span className='label-value'>Username</span>
          <div className='input-value'>
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="" />
          </div>
        </div>
        <div className='input'>
          <span className='label-value'>Password</span>
          <div className='input-value'>
            <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder="" />
          </div>
        </div>
        <p className="forgot-password text-right mt-2">
          Forgot <a href="#" style={{ textDecoration: 'none', color: 'white' }}> password</a>?
        </p>
        <div className="d-grid gap-2 mt-3">
          <input className="btn btn-primary" type='submit' onClick={submit} value='login' />
        </div>
      </form>
    </div>
  )
}

export default Login
