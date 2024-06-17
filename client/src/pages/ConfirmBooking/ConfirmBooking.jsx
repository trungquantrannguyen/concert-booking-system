import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import { StoreContext } from '../../context/StoreContext';

const ConfirmBooking = () => {
  const { state } = useLocation();
  const { token, email, phoneNumber } = useContext(StoreContext);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/concerts');
      return;
    }

    const fetchDetails = async () => {
      try {
        // Fetch venue details
        const venueResponse = await axios.get(`http://localhost:3000/api/venue/${state.venueID}`, {
          headers: { Authorization: `${token}` }
        });
        setVenue(venueResponse.data);

        // Calculate total price
        let price = 0;
        for (const [className, count] of Object.entries(state.selectedSeats)) {
          price += count * venueResponse.data.priceRange[className];
        }
        setTotalPrice(price);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [state, token, navigate]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/booking/',
        {
          concertID: state.concertID,
          numOfTicket: Object.values(state.selectedSeats).reduce((a, b) => a + b, 0),
          ticketClass: Object.entries(state.selectedSeats).map(([className, count]) => ({
            className,
            count,
          })),
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Redirect to Stripe checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error confirming booking:', error);
      setLoading(false);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="confirm-booking-container">
      <Row>
        <Navbar />
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Card.Text><strong>Email:</strong> {email}</Card.Text>
              <Card.Text><strong>Phone Number:</strong> {phoneNumber}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Concert Details</Card.Title>
              <Card.Text><strong>Concert:</strong> {state.concert}</Card.Text>
              <Card.Text><strong>Artist:</strong> {state.artist}</Card.Text>
              <Card.Text><strong>Date:</strong> {state.date}</Card.Text>
              <Card.Text><strong>Time:</strong> {state.time}</Card.Text>
              <Card.Text><strong>Venue:</strong> {venue.venueName}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Selected Seats</Card.Title>
              {Object.entries(state.selectedSeats).map(([className, count]) => (
                <Card.Text key={className}>
                  <strong>{className}:</strong> {count} seats x {venue.priceRange[className]}đ = {count * venue.priceRange[className]} VND
                </Card.Text>
              ))}
              <Card.Title>Total Price </Card.Title>
              <Card.Text>
                {totalPrice} VND
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <Form.Group controlId="paymentMethod">
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Control
                className='update-form'
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={handleConfirm} disabled={loading} className="btn-primary">
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmBooking;
