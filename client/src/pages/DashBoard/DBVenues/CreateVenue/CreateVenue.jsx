import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../../context/StoreContext';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Navbar from '../../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import '../..//DashBoard.css';
import { Row, Col, Button } from 'react-bootstrap';

function CreateVenue() {
    const { _id, token } = useContext(StoreContext);

    const [venueName, setVenueName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [seatClass, setSeatClass] = useState({});
    const [priceRange, setPriceRange] = useState({});
    const [currentSeatClass, setCurrentSeatClass] = useState({ class: '', quantity: '' });
    const [currentPriceRange, setCurrentPriceRange] = useState({ class: '', price: '' });

    const navigate = useNavigate();

    const handleCurrentSeatClassChange = (e) => {
        const { name, value } = e.target;
        setCurrentSeatClass({ ...currentSeatClass, [name]: value });
    };

    const handleCurrentPriceRangeChange = (e) => {
        const { name, value } = e.target;
        setCurrentPriceRange({ ...currentPriceRange, [name]: value });
    };

    const addSeatClass = (e) => {
        e.preventDefault();
        if (currentSeatClass.class && currentSeatClass.quantity) {
            setSeatClass((prevSeatClass) => ({
                ...prevSeatClass,
                [currentSeatClass.class]: parseInt(currentSeatClass.quantity)
            }));
            setCurrentSeatClass({ class: '', quantity: '' });
        }
    };

    const addPriceRange = (e) => {
        e.preventDefault();
        if (currentPriceRange.class && currentPriceRange.price) {
            setPriceRange((prevPriceRange) => ({
                ...prevPriceRange,
                [currentPriceRange.class]: parseInt(currentPriceRange.price)
            }));
            setCurrentPriceRange({ class: '', price: '' });
        }
    };

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3000/api/venue/${_id}`, {
                venueName: venueName,
                location: location,
                capacity: parseInt(capacity),
                seatClass: seatClass,
                priceRange: priceRange
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201 || res.data === 'Created successfully') {
                        navigate('/dbvenues');
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
                        <h3>New Venue</h3>
                        <div className='input'>
                            <span className='label-value'>Venue Name</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setVenueName(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Location</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setLocation(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Capacity</span>
                            <div className='input-value'>
                                <input type='number' onChange={(e) => setCapacity(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Seat Class</span>
                            <div className='input-value-select'>
                                <Col>
                                    <input
                                        type='text'
                                        name='class'
                                        value={currentSeatClass.class}
                                        onChange={handleCurrentSeatClassChange}
                                        placeholder='Class'
                                    />
                                </Col>
                                <Col>
                                    <input
                                        type='number'
                                        name='quantity'
                                        value={currentSeatClass.quantity}
                                        onChange={handleCurrentSeatClassChange}
                                        placeholder='Quantity'
                                    />
                                </Col>
                                <Col>
                                    <Button className='btn' onClick={addSeatClass}>add</Button>
                                </Col>
                            </div>
                        </div>
                        <div>
                            <h6>Seat Classes</h6>
                            {Object.keys(seatClass).map((key) => (
                                <p key={key}>{key}: {seatClass[key]}</p>
                            ))}
                        </div>
                        <div className='input'>
                            <span className='label-value'>Price Range</span>
                            <div className='input-value-select'>
                                <Col>
                                    <input
                                        type='text'
                                        name='class'
                                        value={currentPriceRange.class}
                                        onChange={handleCurrentPriceRangeChange}
                                        placeholder='Class'
                                    />
                                </Col>
                                <Col>
                                    <input
                                        type='number'
                                        name='price'
                                        value={currentPriceRange.price}
                                        onChange={handleCurrentPriceRangeChange}
                                        placeholder='Price'
                                    />
                                </Col>
                                <Col>
                                    <Button className='btn btn-primary' onClick={addPriceRange}>add</Button>
                                </Col>
                            </div>
                        </div>
                        <div>
                            <h6>Price Ranges</h6>
                            {Object.keys(priceRange).map((key) => (
                                <p key={key}>{key}: {priceRange[key]}</p>
                            ))}
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

export default CreateVenue;
