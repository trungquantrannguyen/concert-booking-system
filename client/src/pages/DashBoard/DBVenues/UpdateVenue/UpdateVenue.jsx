import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../../context/StoreContext';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Navbar from '../../../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import '../..//DashBoard.css';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { concertImg, getDownloadURL, ref, uploadBytesResumable } from '../../../../firebase';

function UpdateVenue() {
    const { venueID } = useParams();
    const { token, _id } = useContext(StoreContext);
    const [venue, setVenue] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const navigate = useNavigate();

    const [currentSeatClass, setCurrentSeatClass] = useState({ class: '', quantity: '' });
    const [currentPriceRange, setCurrentPriceRange] = useState({ class: '', price: '' });

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const venueResponse = await axios.get(`http://localhost:3000/api/venue/${venueID}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setVenue(venueResponse.data);
            } catch (error) {
                console.error('Error fetching venue details:', error);
            }
        };

        fetchVenue();
    }, [venueID, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVenue({ ...venue, [name]: value });
    };

    const handleCurrentSeatClassChange = (e) => {
        const { name, value } = e.target;
        setCurrentSeatClass({ ...currentSeatClass, [name]: value });
    };

    const handleCurrentPriceRangeChange = (e) => {
        const { name, value } = e.target;
        setCurrentPriceRange({ ...currentPriceRange, [name]: value });
    };

    const updateSeatClass = (e) => {
        e.preventDefault();
        if (currentSeatClass.class && currentSeatClass.quantity) {
            setVenue((prevVenue) => ({
                ...prevVenue,
                seatClass: {
                    ...prevVenue.seatClass,
                    [currentSeatClass.class]: parseInt(currentSeatClass.quantity)
                }
            }));
            setCurrentSeatClass({ class: '', quantity: '' });
        }
    };

    const updatePriceRange = (e) => {
        e.preventDefault();
        if (currentPriceRange.class && currentPriceRange.price) {
            setVenue((prevVenue) => ({
                ...prevVenue,
                priceRange: {
                    ...prevVenue.priceRange,
                    [currentPriceRange.class]: parseInt(currentPriceRange.price)
                }
            }));
            setCurrentPriceRange({ class: '', price: '' });
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUploading(true);
            console.log("Uploading file:", file);
            const storageRef = ref(concertImg, `venues/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    setImageUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at", downloadURL);
                    setVenue((prevVenue) => ({ ...prevVenue, imgURL: downloadURL }));
                    setImageUploading(false);
                }
            );
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (imageUploading) {
            console.log("Image is still uploading, please wait...");
            return;
        }
        console.log("Submitting venue data:", venue);
        try {
            await axios.put(`http://localhost:3000/api/venue/${_id}/${venueID}`, venue, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            navigate('/dbvenues');
        } catch (error) {
            console.error("Error updating venue", error);
            alert('Failed to update venue. Please try again.');
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
                    <h2 className='update-header'>Update Venue</h2>
                    <Form onSubmit={submit} className='update-form'>
                        <Form.Group controlId="venueName">
                            <Form.Label>Venue Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='venueName'
                                value={venue.venueName || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type='text'
                                name='location'
                                value={venue.location || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="capacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control
                                type='number'
                                name='capacity'
                                value={venue.capacity || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="seatClass">
                            <Form.Label>Seat Class</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type='text'
                                        name='class'
                                        value={currentSeatClass.class}
                                        onChange={handleCurrentSeatClassChange}
                                        placeholder='Class'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type='number'
                                        name='quantity'
                                        value={currentSeatClass.quantity}
                                        onChange={handleCurrentSeatClassChange}
                                        placeholder='Quantity'
                                    />
                                </Col>
                                <Col>
                                    <Button onClick={updateSeatClass}>Update</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        <div>
                            <h6>Seat Classes</h6>
                            {Object.keys(venue.seatClass || {}).map((key) => (
                                <p key={key}>{key}: {venue.seatClass[key]}</p>
                            ))}
                        </div>
                        <Form.Group controlId="priceRange">
                            <Form.Label>Price Range</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type='text'
                                        name='class'
                                        value={currentPriceRange.class}
                                        onChange={handleCurrentPriceRangeChange}
                                        placeholder='Class'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type='number'
                                        name='price'
                                        value={currentPriceRange.price}
                                        onChange={handleCurrentPriceRangeChange}
                                        placeholder='Price'
                                    />
                                </Col>
                                <Col>
                                    <Button onClick={updatePriceRange}>Update</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        <div>
                            <h6>Price Ranges</h6>
                            {Object.keys(venue.priceRange || {}).map((key) => (
                                <p key={key}>{key}: {venue.priceRange[key]}</p>
                            ))}
                        </div>
                        <Form.Group controlId="imgURL">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="imgURL" 
                                onChange={handleFileChange} 
                            />
                        </Form.Group>
                        <div className='d-grid gap-2 mt-3'>
                            <Button variant='primary' className='mt-3' type='submit'>Update</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default UpdateVenue;
