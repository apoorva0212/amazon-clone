import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';

function Payment() {
    const [{ basket, user }] = useStateValue();
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                  Checkout (
                      <Link to="/checkout">{basket?.length} items</Link> 
                  ) 
                </h1>
                {/* Delivery Address */}
                <div className="payment__section">
                    <div class="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123, React Bungalow</p>
                        <p>Frontend Lane, Fullstack</p>
                    </div>
                </div>
                {/* Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div class="payment__items">
                        {basket.map( basketitem => (
                            <CheckoutProduct 
                                id={basketitem.id} 
                                title={basketitem.title}
                                image={basketitem.image}
                                price={basketitem.price}
                                rating={basketitem.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment Method */}
                <div className="payment__section">
                    <div class="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div class="payment__details">

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment;
