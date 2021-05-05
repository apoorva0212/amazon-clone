import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from './axios';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { CardElement, useStripe , useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const[clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        //generates the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe Payments accepts in sub currency, for INR its paisa.
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Avoids clicking button n times, as soon as one clicks it disables the button
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        .then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })


            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace("/orders");
        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                            <CurrencyFormat 
                                        renderText={(value) => (
                                            <h4>Order Total: {value}</h4>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment;
