import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { StoreContext } from '../../context/StoreContext';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import './Concert.css';

const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const { token } = useContext(StoreContext);
  const [artists, setArtists] = useState([]);
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const [concertResponse, artistResponse, venueResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/concert'),
          axios.get('http://localhost:3000/api/artist'),
          axios.get('http://localhost:3000/api/venue')
        ]);

        setConcerts(concertResponse.data);
        setArtists(artistResponse.data);
        setVenues(venueResponse.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    fetchConcerts();
  }, [token]);

  const getArtistName = (artistID) => {
    const artist = artists.find(a => a._id === artistID);
    return artist ? artist.name : 'Unknown Artist';
  };

  const getVenueName = (venueID) => {
    const venue = venues.find(v => v._id === venueID);
    return venue ? venue.venueName : 'Unknown Venue';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (concertID) => {
    navigate(`/concerts/buy-ticket/${concertID}`);
  };

  return (
    <Container fluid>
      <Row>
        <Navbar />
      </Row>
      <Row>
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className='header'>
            <div className='text'>Concerts</div>
            <div className='underline'></div>
          </div>
        </div>
      </Row>
      <Row>
        {concerts.map(concert => (
          <Col key={concert._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="concert-card h-100">
              <Card.Img variant="top" src={concert.imgURL} alt={concert.name} className="concert-image" />
              <Card.Body>
                <Card.Title>{concert.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  <strong>Artist:</strong> {getArtistName(concert.artist)}<br />
                  <strong>Date:</strong> {formatDate(concert.date)}<br />
                  <strong>Time:</strong> {concert.time}<br />
                  <strong>Venue:</strong> {getVenueName(concert.venue)}
                </Card.Text>
                <Button className="btn btn-primary mt-auto" onClick={() => handleSubmit(concert._id)}>
                  Buy Ticket
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Concert;
