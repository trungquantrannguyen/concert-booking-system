import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Cart.css'

function Cart() {
    const [type, setType] = useState("Official Ticket");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(150000);
    const [totalPay, setTotalPay] = useState(price * quantity);

    const calculateTotalPay = () => {
        const total = quantity * price;
        setTotalPay(total);
    }

    return (
        <div className="container-fluid" id="payment-container">
            <Navbar />
            <div className="card" id="payment-card">
                <div className="card-body">
                    <h4 className="card-title">PAYMENT</h4>
                    <p className="card-text">
                        Please check the information carefully!
                    </p>
                </div>
                <div className="card" id="infor-card">
                    <h6 className="card-title">Customer Information</h6>
                    <ul className="list-group list-group-flush">
                        <p className="card-text">User Name</p>
                        <p className="card-text">User Address</p>
                        <p className="card-text">User Phone Number</p>
                    </ul>
                </div>
                <div className="card" id="infor-card">
                    <h6 className="card-title">Payment Information</h6>
                    <ul className="list-group list-group-flush">
                        <p className="card-text-header">Type of Ticket</p>
                        <li className="list-group-item">
                            <p className="card-text">{type}</p>
                        </li>
                        <p className="card-text-header">Price</p>
                        <li className="list-group-item">
                            <p className="card-text">{price}</p>
                        </li>
                        <p className="card-text-header">Quantities</p>
                        <li className="list-group-item">
                            <p className="card-text">{quantity}</p>
                        </li>
                        <p className="card-text-header">Total Payment</p>
                        <li className="list-group-item">
                            <p className="card-text-total">{totalPay}</p>
                        </li>
                    </ul>
                </div>
                <div className="card" id="infor-card">
                    <h6 className="card-title">Transaction Method</h6>
                    <ul className="list-group list-group-flush">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                            />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Momo
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2" checked
                            />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Credit/Debit Card
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2" checked
                            />
                            <label class="form-check-label" for="flexRadioDefault2">
                                ATM Card/Internet Banking
                            </label>
                        </div>
                    </ul>
                </div>

                <div className="card-body">
                    <button href="#" id="payment-btn">PAYMENT</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;