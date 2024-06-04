import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

function Login() {

  const navigate = useNavigate()

  const [username, setUser] = useState()
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/user/signin", {
        username, password
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
            const token = Cookies.get('access_token');
            if (token) {
              localStorage.setItem("token", token);
              navigate('/concerts')
            } else {
              alert('Login failed! No token received.');
            }
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
            <input type="text" onChange={(e) => { setUser(e.target.value) }} placeholder="" />
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
