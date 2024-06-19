import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../../context/StoreContext';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Navbar from '../../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'
import '../..//DashBoard.css';
import { Row, Col } from 'react-bootstrap';

function CreateConcert() {
    const { _id, token,
        name, setConcert,
        date, setDate,
        time, setTime,
        artist, setArtist,
        venue, setVenue } = useContext(StoreContext);

    const [artists, setArtists] = useState([]);
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const artistResponse = await axios.get('http://localhost:3000/api/artist');
                setArtists(artistResponse.data);

                const venueResponse = await axios.get('http://localhost:3000/api/venue');
                setVenues(venueResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    async function handleArtistChange(e) {
        const selectedArtistId = e.target.value;
        setArtist(selectedArtistId);
        console.log(`Selected Artist ID: ${selectedArtistId}`);
        try {
            const response = await axios.get(`http://localhost:3000/api/artist/${selectedArtistId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    }

    async function handleVenueChange(e) {
        const selectedVenueId = e.target.value;
        setVenue(selectedVenueId);
        console.log(`Selected Venue ID: ${selectedVenueId}`);
        try {
            const response = await axios.get(`http://localhost:3000/api/venue/${selectedVenueId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching venue data:', error);
        }
    }

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3000/api/concert/${_id}`, {
                name: name,
                artist: artist,
                date: date,
                time: time,
                venue: venue
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201 || res.data === 'Created successfully') {
                        navigate('/concerts');
                    }
                })
                .catch((e) => {
                    alert('Wrong inputs!');
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <form className='inputs' action='POST'>
                        <h3>New Concert</h3>
                        <div className='input'>
                            <span className='label-value'>Concert</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setConcert(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Artist</span>
                            <div className='input-value'>
                                <select onChange={handleArtistChange}>
                                    <option value=''>Select Artist</option>
                                    {artists.map((artist) => (
                                        <option key={artist._id} value={artist._id}>
                                            {artist.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Date</span>
                            <div className='input-value'>
                                <input type='date' onChange={(e) => setDate(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Time</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setTime(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Venue</span>
                            <div className='input-value'>
                                <select onChange={handleVenueChange}>
                                    <option value=''>Select Venue</option>
                                    {venues.map((venue) => (
                                        <option key={venue._id} value={venue._id}>
                                            {venue.venueName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='d-grid gap-2 mt-3'>
                            <input className='btn btn-primary' type='submit' onClick={submit} value='create' />
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default CreateConcert;
