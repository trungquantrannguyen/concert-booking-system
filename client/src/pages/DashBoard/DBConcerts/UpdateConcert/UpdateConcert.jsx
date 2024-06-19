import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../context/StoreContext';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

const UpdateConcert = () => {
    const { concertID } = useParams();
    const [concert, setConcert] = useState({});
    const [artists, setArtists] = useState([]);
    const [venues, setVenues] = useState([]);
    const { token, _id } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConcert = async () => {
            try {
                const concertResponse = await axios.get(`http://localhost:3000/api/concert/${concertID}`);
                setConcert(concertResponse.data);
                
                const artistResponse = await axios.get('http://localhost:3000/api/artist');
                setArtists(artistResponse.data);

                const venueResponse = await axios.get('http://localhost:3000/api/venue');
                setVenues(venueResponse.data);
            } catch (error) {
                console.error('Error fetching concert details:', error);
            }
        };

        fetchConcert();
    }, [concertID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConcert({ ...concert, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/concert/${_id}/${concertID}`, concert, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            navigate('/dbconcerts');
        } catch (error) {
            console.error('Error updating concert:', error);
        }
    };

    return ( 
        <Container fluid>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <h2 className='update-header'>Update Concert</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={concert.name || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="artist">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="artist" 
                                value={concert.artist || ''} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select Artist</option>
                                {artists.map(artist => (
                                    <option key={artist._id} value={artist._id}>{artist.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="date" 
                                value={concert.date ? concert.date.substring(0, 10) : ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="time" 
                                value={concert.time || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="venue" className='update-form'>
                            <Form.Label>Venue</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="venue" 
                                value={concert.venue || ''} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select Venue</option>
                                {venues.map(venue => (
                                    <option key={venue._id} value={venue._id}>{venue.venueName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">update concert</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateConcert;
