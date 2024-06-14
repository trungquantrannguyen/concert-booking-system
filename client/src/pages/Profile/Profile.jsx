import React, { useContext, useEffect } from "react"
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { StoreContext } from "../../context/StoreContext"
import user from '../../assets/user_icon.png'

function Profile() {
    const navigate = useNavigate()
    const { username, setUsername,
        email, setEmail,
        phoneNumber, setPhone,
        gender, setGender,
        dob, setDoB } = useContext(StoreContext)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUsername(userData.username || '');
            setEmail(userData.email || '');
            setPhone(userData.phoneNumber || '');
            setGender(userData.gender || '');
            setDoB(userData.dob || '');
        }
    }, [setUsername, setEmail, setPhone, setGender, setDoB]);

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
        <>
            <Navbar />
            <div className="container" id="profile-container">
                <div className="profile-head">
                    <img src={user} className="card-img-top" />
                    <h5 className="card-title">{username}'s profile</h5>
                </div>
                <div className="profile-body">
                    <form>
                        <div className="row mb-3">
                            <label className=" col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-form-label">Phone Number</label>
                            <div className="col-sm-10">
                                <input type='text' className="form-control" onChange={(e) => { setPhone(e.target.value) }} value={phoneNumber} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-form-label">Gender</label>
                            <div className="col-sm-10">
                                <select name='gender' className="form-control" onChange={(e) => { setGender(e.target.value) }} value={gender}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-form-label">Day of Birth</label>
                            <div className="col-sm-10">
                                <input type='date' className="form-control" onChange={(e) => { setDoB(e.target.value) }} value={dob} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-form-label">Profile Image</label>
                            <div className="col-sm-10">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={submit}>update</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile