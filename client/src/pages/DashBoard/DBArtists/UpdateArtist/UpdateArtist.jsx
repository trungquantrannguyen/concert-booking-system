import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../context/StoreContext';
import Navbar from '../../../../components/Navbar/Navbar';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { concertImg, getDownloadURL, ref, uploadBytesResumable } from '../../../../firebase';

const UpdateArtist = () => {
    const { artistID } = useParams();
    const { token, _id } = useContext(StoreContext);
    const [artist, setArtist] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtist = async () => {
            try {               
                const artistResponse = await axios.get(`http://localhost:3000/api/artist/${artistID}`);
                setArtist(artistResponse.data);
            } catch (error) {
                console.error('Error fetching concert details:', error);
            }
        };

        fetchArtist();
    }, [artistID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtist({ ...artist, [name]: value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(concertImg, `artists/${file.name}`);
            await uploadBytesResumable(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setArtist({ ...artist, imgURL: url });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(artist)
        try {
            await axios.put(`http://localhost:3000/api/artist/${_id}/${artistID}`, artist, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            navigate('/dbartists');
        } catch (error) {
            console.error('Error updating concert:', error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <h2 className='update-header'>Update Artist</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={artist.name || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="genre" className='update-form'>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="genre" 
                                value={artist.genre || ''} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="imgURL">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="imgURL" 
                                onChange={handleFileChange} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">update artist</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateArtist;
