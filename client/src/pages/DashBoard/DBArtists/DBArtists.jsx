import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Row, Col, Table, Container, Button } from 'react-bootstrap';
import '../DashBoard.css'

const DBArtists = () => {
    const { token, _id } = useContext(StoreContext);
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistResponse = await axios.get('http://localhost:3000/api/artist');
                setArtists(artistResponse.data);
            } catch (error) {
                console.error('Error fetching concerts:', error);
            }
        };

        fetchArtists();
    }, [token]);

    const handleUpdate = (artistID) => {
        navigate(`/dbartists/edit-artist/${artistID}`);
    };

    const handleDelete = async (adminID, id) => {
        try {
            await axios.delete(`http://localhost:3000/api/artist/${adminID}/${id}`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setArtists(artists.filter(artist => artist._id !== id));
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
                            to="/dbartists/create-artist"
                            className="btn btn-primary mb-3">
                            create new artist
                        </Link>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Genre</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map(artist => (
                                <tr key={artist._id}>
                                    <td>{artist.name}</td>
                                    <td>{artist.genre}</td>
                                    <td>
                                        <Button className="btn btn-primary mb-3" onClick={() => handleUpdate(artist._id)}>update</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleDelete(_id, artist._id)} className="btn btn-primary mb-3">delete</Button>
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

export default DBArtists;
