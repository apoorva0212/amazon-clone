import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" 
                />
            <div className="home__row">
                <Product
                    id="12321341"
                    title="OnePlus Y Series 80 cm (32 inch) HD Ready LED Smart Android TV  (32HA0A00)"
                    price={38000}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/817gj7pfUzL._SL1500_.jpg"
                />
                <Product
                    id="49538094"
                    title="PICTEK Gaming Mouse Wired, 8 Programmable Buttons, Chroma RGB Backlit"
                    price={4199.0}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/61gxUsLtlyL._AC_SL1280_.jpg"
                />
            </div>
            <div className="home__row">
                <Product
                    id="4903850"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={50000}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                    id="23445930"
                    title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={3499}
                    rating={5}
                    image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                />
                <Product
                    id="3254354345"
                    title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                    price={59899}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                />
            </div>
            <div className="home__row">
                <Product
                    id="90829332"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                    price={109498}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                />
            </div>
            </div>
        </div>
    )
}

export default Home;
