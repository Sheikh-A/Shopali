import React, {useState} from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Countries from './components/Countrys';
import Flex from './components/Flex';
import FlexShipments from './components/FlexShipments';
import AddClient from './components/AddClient.js';
import logo from './assets/logo.png';
import AddShipment from './components/AddShipment';
import Button from './Button.js';
import PetGrid from "./components/PetGrid";



function App(props) {


    const [logged, setLogged] = useState(localStorage.getItem("token") ? true : false)

    const logout = _ => {
      localStorage.removeItem("token");
      setLogged(false)
    }

    // <NavLink to = '/flexCustomer'><Button type="success">Add Client</Button></NavLink>
    //     <NavLink to = '/flexShipment'><Button type="success">Add Shipment</Button></NavLink>


    // <Route path = '/flexCustomer' render = {(props) => <AddClient {...props} />} />
    // <Route path = '/flexShipment' render = {(props) => <AddShipment {...props} />} />
  return (
    <div className="App">
      <div  className="container">
        <div className="navigation">
          { logged ? null : <NavLink to = '/register'><Button type="danger">Register</Button></NavLink>}
          { logged ? <NavLink to = '/'><Button type="danger" onClick={logout}>Logout</Button></NavLink> : <NavLink to = '/login'><Button type="danger">Login</Button></NavLink>}
          <NavLink to = '/flexdata'><Button type="primary" >Clients</Button></NavLink>
          <NavLink to = '/flexshipments'><Button type="primary" >Shipments</Button></NavLink>
          <NavLink to = '/flexCustomer'><Button type="success">Add Client</Button></NavLink>
          <NavLink to = '/flexShipment'><Button type="success">Add Shipment</Button></NavLink>
          <NavLink to = '/countrieslist'><Button type="primary" >Countries</Button></NavLink>
          <NavLink to = '/flexpups'><Button type="warning">Flex Pups!</Button></NavLink>
        </div>
      </div>
      <Route path = '/register' component = {Register} />
      <Route path = '/login' render = {(props) => <Login {...props} setLogged={setLogged} />} />
      <Route path = '/flexCustomer' component = {AddClient} />
      <Route path = '/countrieslist' render = {(props) => <Countries {...props} />} />
      <Route path = '/flexdata' render = {(props) => <Flex {...props} />} />
      <Route path = '/flexshipments' render = {(props) => <FlexShipments {...props} />} />
      <Route path = '/flexShipment' render = {(props) => <AddShipment {...props} />} />
      <Route path = '/flexpups' render = {(props) => <PetGrid {...props} />} />

      <Route exact path = '/' render={() =>
      <div>
        <h1 className="logoheader">🄰🄻🄸🄿🄾🅁🅃</h1>
        <NavLink to='/login'><img className="ship" alt="logo ship" src={logo} /></NavLink>
      </div>
      } />

  </div>
  );
}

export default App;
