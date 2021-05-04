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
      <Payment/>
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
