import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import { StoreContext } from '../../context/StoreContext';
import './Booking.css';

const Booking = () => {
  const { concertID } = useParams();
  const { token } = useContext(StoreContext);
  const [concert, setConcert] = useState(null);
  const [venue, setVenue] = useState(null);
  const [artist, setArtist] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch concert details
        const concertResponse = await axios.get(`http://localhost:3000/api/concert/${concertID}`, {
          headers: { Authorization: `${token}` }
        });
        setConcert(concertResponse.data);

        // Fetch venue details
        const venueID = concertResponse.data.venue;
        const venueResponse = await axios.get(`http://localhost:3000/api/venue/${venueID}`, {
          headers: { Authorization: `${token}` }
        });
        setVenue(venueResponse.data);

        // Fetch artist details
        const artistID = concertResponse.data.artist;
        const artistResponse = await axios.get(`http://localhost:3000/api/artist/${artistID}`, {
          headers: { Authorization: `${token}` }
        });
        setArtist(artistResponse.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [concertID, token]);

  const handleSeatChange = (className, change) => {
    setSelectedSeats((prevState) => {
      const updatedCount = (prevState[className] || 0) + change;
      if (updatedCount > 0) {
        return { ...prevState, [className]: updatedCount };
      } else {
        const { [className]: _, ...newState } = prevState;
        return newState;
      }
    });
  };

  const handleSubmit = () => {
    navigate('/confirm-booking', {
      state: {
        concertID: concert._id,
        concert: concert.name,
        artist: artist.name,
        date: concert.date,
        time: concert.time,
        venueID: venue._id,
        selectedSeats
      }
    });
  };

  if (!concert || !venue || !artist) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Navbar />
      </Row>
      <Row className="buy-ticket">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="card-title">{concert.name}</Card.Title>
              <Card.Text><strong>Artist:</strong> {artist.name}</Card.Text>
              <Card.Text><strong>Date:</strong> {concert.date}</Card.Text>
              <Card.Text><strong>Time:</strong> {concert.time}</Card.Text>
              <Card.Text><strong>Venue:</strong> {venue.venueName}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="card-title">Select Your Seats</Card.Title>
              <Form>
                {Object.keys(venue.seatClass).map((className) => (
                  <Form.Group key={className} controlId={className}>
                    <Form.Label>{className} ({venue.priceRange[className]} VND)</Form.Label>
                    <div className="seat-selection">
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleSeatChange(className, -1)}
                        disabled={(selectedSeats[className] || 0) < 0}
                      >
                        -
                      </Button>
                      <span>{selectedSeats[className] || 0}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleSeatChange(className, 1)}
                        disabled={(selectedSeats[className] || 0) >= venue.seatClass[className]}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Group>
                ))}
              </Form>
              <Button className="mt-3" variant="primary" onClick={handleSubmit}>
                process to payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
