import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { StoreContext } from '../../context/StoreContext';

const PaymentSuccess = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const createBooking = async () => {
      const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));

      try {

        const response = await axios.post(
          'http://localhost:3000/api/booking/create', bookingDetails,
          {
            headers: {
              'Authorization': `${token}`,
            },
          }
        );
        console.log('Booking created:', response.data);
      } catch (error) {
        console.error('Error creating booking:', error);
      }
    };
    createBooking();
  }, [token]);

  return (
    <Container fluid className="payment-success-container" style={{ paddingTop: '70px' }}>
      <Row>
        <Col md={12}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Payment Successful!</Card.Title>
              <Card.Text>Your booking has been successfully created.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/concerts')}>
                Back to Concerts
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
