import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, Link } from 'react-router-dom'
import './Profile.css'
import user from '../../assets/user_icon.png'

function Profile(){
    const navigate = useNavigate()

    const [username, setUser] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()
    const [dob, setDoB] = useState()


    return(
    <>
        <Navbar/>
        <div class="container-fluid" id="profile-container">
            <img src={user} class="card-img-top"/>
            <div class="card-body">
                <h5 class="card-title">{username}'s Profile</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Name: {username} </li>
                <li class="list-group-item">Email: {email}</li>
                <li class="list-group-item">Phone Number: {phone}</li>
                <li class="list-group-item">Gender: {phone}</li>
                <li class="list-group-item">Date of birth: {dob}</li>
            </ul>
            <div class="card-body">
                <button class="btn">Update</button>
            </div>
  </div>
    </>
    );
}

export default Profile