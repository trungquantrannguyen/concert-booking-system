import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Row, Col, Table, Container, Button } from 'react-bootstrap';
import '../DashBoard.css'

const DBConcerts = () => {
    const [concerts, setConcerts] = useState([]);
    const { token, _id } = useContext(StoreContext);
    const [artists, setArtists] = useState([]);
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/concert');
                setConcerts(response.data);

                const artistResponse = await axios.get('http://localhost:3000/api/artist');
                setArtists(artistResponse.data);

                const venueResponse = await axios.get('http://localhost:3000/api/venue');
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
        return venue ? venue.venueName : 'Unknown Artist';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleUpdate = (concertID) => {
        navigate(`/dbconcerts/edit-concert/${concertID}`);
    };

    const handleDelete = async (adminID, id) => {
        try {
            await axios.delete(`http://localhost:3000/api/concert/${adminID}/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setConcerts(concerts.filter(concert => concert._id !== id));
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
                            to="/dbconcerts/create-concert"
                            className="btn btn-primary mb-3">
                            create new concert
                        </Link>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Artist</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Venue</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {concerts.map(concert => (
                                <tr key={concert._id}>
                                    <td>{concert.name}</td>
                                    <td>{getArtistName(concert.artist)}</td>
                                    <td>{formatDate(concert.date)}</td>
                                    <td>{concert.time}</td>
                                    <td>{getVenueName(concert.venue)}</td>
                                    <td>
                                        <Button className="btn btn-primary mb-3" onClick={() => handleUpdate(concert._id)}>update</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleDelete(_id, concert._id)} className="btn btn-primary mb-3">delete</Button>
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

export default DBConcerts;
