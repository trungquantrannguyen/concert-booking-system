import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Row, Col, Table, Container, Button } from 'react-bootstrap';
import '../DashBoard.css'

const DBVenues = () => {
    const { token, _id } = useContext(StoreContext);
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venueResponse = await axios.get('http://localhost:3000/api/venue');
                setVenues(venueResponse.data);
            } catch (error) {
                console.error('Error fetching concerts:', error);
            }
        };

        fetchVenues();
    }, [token]);

    const handleUpdate = (venueID) => {
        navigate(`/dbvenues/edit-venue/${venueID}`);
    };

    const handleDelete = async (adminID, id) => {
        try {
            await axios.delete(`http://localhost:3000/api/venue/${adminID}/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setVenues(venues.filter(venue => venue._id !== id));
        } catch (error) {
            console.error('Error deleting concert:', error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10} className='db-container'>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <div className='header'>
                            <div className='text'>Dashboard</div>
                            <div className='underline'></div>
                        </div>
                    </div>
                    <div>
                        <Link
                            to="/dbvenues/create-venue"
                            className="btn btn-primary mb-3">
                            create new venue
                        </Link>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Venue Name</th>
                                <th>Location</th>
                                <th>Capacity</th>
                                <th>Seat Class</th>
                                <th>Price Range</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues.map(venue => (
                                <tr key={venue._id}>
                                    <td>{venue.venueName}</td>
                                    <td>{venue.location}</td>
                                    <td>{venue.capacity}</td>
                                    <td>
                                        <ul>
                                            {venue.seatClass && Object.entries(venue.seatClass).map(([seatClass, quantity]) => (
                                                <li key={seatClass}>{seatClass}: {quantity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {venue.priceRange && Object.entries(venue.priceRange).map(([seatClass, price]) => (
                                                <li key={seatClass}>{seatClass}: {price}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <Button className="btn btn-primary mb-3" onClick={() => handleUpdate(venue._id)}>update</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleDelete(_id, venue._id)} className="btn btn-primary mb-3">delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default DBVenues;
