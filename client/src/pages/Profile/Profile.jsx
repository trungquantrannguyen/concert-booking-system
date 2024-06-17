import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';
import { Row, Col, Form, Button } from 'react-bootstrap';

function Profile() {
    const { token, user, setUser } = useContext(StoreContext);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch user data on mount if not already in context
        if (!user || !user._id) {
            async function fetchUserData() {
                try {
                    const response = await axios.get(`http://localhost:3000/api/user/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    setUserData({
                        email: response.data.email || '',
                        phoneNumber: response.data.phoneNumber || ''
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            fetchUserData();
        } else {
            setUserData({
                email: user.email || '',
                phoneNumber: user.phoneNumber || ''
            });
        }
    }, [user, token, setUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/user/${user._id}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            setSuccess('Profile updated successfully!');
            setError('');  // Clear any previous error messages
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
            setSuccess('');  // Clear any previous success messages
        }
    };

    return (
        <div>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <div className="user-profile">
                        <h2>User Profile</h2>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={userData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update Profile
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
