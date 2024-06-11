import React, { useContext } from 'react'
import '../Login/Login.css'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function SignUp() {

  const navigate = useNavigate()

  const { username, setUsername, password, setPassword, email, setEmail, phoneNumber, setPhone, gender, setGender, dob, setDoB } = useContext(StoreContext)


  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/user/signup', {
        username, email, password, phoneNumber, gender, dob
      })
        .then(res => {
          console.log(res)
          if (res.status === 201 || res.data === "User created successfully") {
            navigate('/login')
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
        <div className='text'>Sign Up</div>
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
          <span className='label-value'>Email</span>
          <div className='input-value'>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="" />
          </div>
        </div>
        <div className='input'>
          <span className='label-value'>Password</span>
          <div className='input-value'>
            <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder="" />
          </div>
        </div>
        <div className='input'>
          <span className='label-value'>Phone Number</span>
          <div className='input-value'>
            <input type='text' onChange={(e) => { setPhone(e.target.value) }} placeholder="" />
          </div>
        </div>
        <div className='input'>
          <span className='label-value'>Gender</span>
          <div className='input-value'>
            <select name='gender' onClick={(e) => { setGender(e.target.value) }} placeholder="">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className='input'>
          <span className='label-value'>Date of Birth</span>
          <div className='input-value'>
            <input type='date' onChange={(e) => { setDoB(e.target.value) }} placeholder="" />
          </div>
        </div>
        <div className="d-grid gap-2 mt-3">
          <input className="btn btn-primary" type='submit' onClick={submit} value='signup' />
        </div>
      </form>
    </div>
  )
}

export default SignUp
