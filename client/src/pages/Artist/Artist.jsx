import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import '../Concert/Concert.css';
const Artist = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artist');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Navbar />
      </Row>
      <Row>
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className='header'>
            <div className='text'>Artists</div>
            <div className='underline'></div>
          </div>
        </div>
      </Row>
      <Row>
        {artists.map(artist => (
          <Col key={artist._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="concert-card h-100">
              <Card.Img variant="top" src={artist.imgURL} alt={artist.name} className="concert-image" />
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  <strong>Genre:</strong> {artist.genre}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Artist;
