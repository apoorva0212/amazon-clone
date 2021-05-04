import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
   const history = useHistory();
    const [{basket, user}] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                  <input type="checkbox"/> This order contains a gift
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} 
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
        />
        
        <button disabled={!user && basket?.length == 0} className={`${!user && 'button__disabled'} ${basket?.length == 0 && 'button__disabled'} subtotal__button`} onClick={e => history.push('/payment')} title="Proceed to Checkout">{user ? 'Proceed to Checkout':'Sign in to Checkout' }</button>
        </div>                          
    )
}

export default Subtotal
