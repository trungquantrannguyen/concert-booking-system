import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';

const Venue = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/venue');
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };

        fetchVenues();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className='header'>
                        <div className='text'>Venues</div>
                        <div className='underline'></div>
                    </div>
                </div>
            </Row>
            <Row>
                {venues.map(venue => (
                    <Col key={venue._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="venue-card h-100">
                            {/* Replace with actual venue image */}
                            <Card.Img variant="top" src={venue.imageUrl} alt={venue.venueName} className="venue-image" />
                            <Card.Body>
                                <Card.Title>{venue.venueName}</Card.Title>
                                <Card.Text>
                                    <strong>Location:</strong> {venue.location}<br />
                                    <strong>Capacity:</strong> {venue.capacity}<br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Venue;
