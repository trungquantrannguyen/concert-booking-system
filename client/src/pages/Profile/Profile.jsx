import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

function Profile() {
    const { token, _id } = useContext(StoreContext);

    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : { email: '', phoneNumber: '' };
    });
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = {
                ...userData,
                password: password 
            };
            const response = await axios.put(`http://localhost:3000/api/user/${_id}`, updatedUserData, {
                headers: {
                    'Authorization': `${token}`,
                }
            });
            setSuccess('Profile updated successfully!');
            setError(''); 

            localStorage.setItem('userData', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
            setSuccess(''); 
        }
    };

    return (
        <div>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={12}>
                    <Card className="user-profile-card">
                        <Card.Body>
                            <Card.Title className='user-title'>User Profile</Card.Title>
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success}</p>}
                            <Form className='user-profile-form' onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        className='user-profile-input'
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
                                        className='user-profile-input'
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        className='user-profile-input'
                                        type="text"
                                        name="phoneNumber"
                                        value={userData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className='btn btn-primary'>
                                    update profile
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
