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

    const ticketClasses = Object.entries(state.selectedSeats).map(([className, count]) => ({
      ticketClass: className,
      concertID: state.concertID,
      numOfTicket: count
    }));

    const numOfTicket = Object.values(state.selectedSeats).reduce((a, b) => a + b, 0);

    try {
      for (const bookingData of ticketClasses) {
        console.log('Booking data:', bookingData); // Log booking data to check format

        const response = await axios.post(
          'http://localhost:3000/api/booking/',
          bookingData,
          {
            headers: {
              'Authorization': `${token}`,
            },
          }
        );

        const ticketIds = response.data.tickets.map(ticket => ticket._id);
        console.log('Server response:', response.data); // Log server response to check for issues

        // Store necessary booking details temporarily
        sessionStorage.setItem('bookingDetails', JSON.stringify({
          numOfTicket: numOfTicket,
          totalPrice: totalPrice,
          concertID: state.concertID,
          tickets: ticketIds,
        }));

        // Redirect to Stripe checkout for the first response
        if (response.data.url) {
          window.location.href = response.data.url;
          break;
        }
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data); // Log server response for 400 error
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCardNumber(e.target.value);
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="confirm-booking-container" style={{ paddingTop: '70px' }}>
      <Row>
        <Navbar />
      </Row>
      <Row className="confirm-booking-card">
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
                  <strong>{className}:</strong> {count} seat(s) x {venue.priceRange[className]} VND = {count * venue.priceRange[className]} VND
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
                {loading ? 'Processing...' : 'confirm booking'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmBooking;
