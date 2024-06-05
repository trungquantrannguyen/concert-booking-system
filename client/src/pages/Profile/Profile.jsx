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
        <div className="container-fluid" id="profile-container">
            <img src={user} class="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{username}'s Profile</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {username} </li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone Number: {phone}</li>
                <li className="list-group-item">Gender: {phone}</li>
                <li className="list-group-item">Date of birth: {dob}</li>
            </ul>
            <div className="card-body">
                <button className="btn">Update</button>
            </div>
  </div>
    </>
    );
}

export default Profile