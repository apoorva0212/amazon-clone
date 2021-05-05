import './App.css';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { auth } from './components/firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

const promise = loadStripe(`pk_test_51InUZYSGsopEONyrAQoK90S2k6sKzw6hP9ZfMDCX1ppzj3RFVnz6ttIvAE0CsM17Yir8etQaDa8MoXtPVqopOwqb002wPoUW7H`);
function App() {
  const[{},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      //logged in
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="App">
    <Switch>
    <Route exact path="/login">
      <Login/>
      </Route>
    <Route exact path="/checkout">
       <Header/>
      <Checkout/>
      </Route>
    <Route exact path="/payment">
      <Header/>
      <Elements stripe={promise}>
      <Payment/>
      </Elements>
    </Route>
    <Route exact path="/orders">
      <Header/>
      <Orders/>
    </Route>
      <Route path="/">
        <Header/>
        <Home/>
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
