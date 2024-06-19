import React, { useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../../context/StoreContext';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Navbar from '../../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'
import '../..//DashBoard.css';
import { Row, Col } from 'react-bootstrap';

function CreateArtist() {
    const { _id, token,
            artist, setArtist,
            genre, setGenre } = useContext(StoreContext);

    const navigate = useNavigate()

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3000/api/artist/${_id}`, {
                name: artist,
                genre: genre
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201 || res.data === 'Created successfully') {
                        navigate('/artists');
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
                        <h3>New Artist</h3>
                        <div className='input'>
                            <span className='label-value'>Artist</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setArtist(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Genre</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setGenre(e.target.value)} placeholder='' />
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

export default CreateArtist;
