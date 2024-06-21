import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { StoreContext } from '../../context/StoreContext';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import './FeaturedEvents.css';
import { Link } from 'react-router-dom';

const FeaturedEvents = () => {
    const [concerts, setConcerts] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        const fetchConcertsAndGenres = async () => {
            try {
                const [concertResponse, artistResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/concert'),
                    axios.get('http://localhost:3000/api/artist'),
                ]);

                setConcerts(concertResponse.data);
                setArtists(artistResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchConcertsAndGenres();
    }, [token]);

    const getGenre = (artistID) => {
        const artist = artists.find(a => a._id === artistID);
        return artist ? artist.genre : 'Unknown Genre';
    };

    const getArtistName = (artistID) => {
        const artist = artists.find(a => a._id === artistID);
        return artist ? artist.name : 'Unknown Artist';
    };

    return (
        <Container fluid id="featured-events">
            <Row>
                <Navbar />
            </Row>
            <Row>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className='header'>
                        <div className='text'>Featured Events</div>
                        <div className='underline'></div>
                    </div>
                </div>
            </Row>
            <Row>
                {concerts.map((concert, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="featured-events-list-item h-100">
                            <Card.Img variant="top" src={concert.imgURL} className="feature-image" alt={concert.name} />
                            <Card.Body>
                                <Link to={`/concerts/buy-ticket/${concert._id}`}>
                                    <Card.Title className='feature-card-title'>{concert.name}</Card.Title>
                                </Link>
                                <Card.Text>{getArtistName(concert.artist)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className='header'>
                        <div className='text'>Top Genres</div>
                        <div className='underline'></div>
                    </div>
                </div>
            </Row>
            <Row>
                {concerts.map((concert, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
                        <div className="featured-events-list-item">
                            <Button className="genres-btn" type="button">{getGenre(concert.artist)}</Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedEvents;
