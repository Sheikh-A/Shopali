import React, {useState} from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ImagesData from './components/Images.js';
import AddImages from './components/AddImages.js';
import logo from './assets/logo.png';
import Button from './Button.js';
import PetGrid from "./components/PetGrid";
import CloudHome from "./components/CloudHome.js";
import CloudUpload from "./components/CloudUpload.js";



function App(props) {


    const [logged, setLogged] = useState(localStorage.getItem("token") ? true : false)

    const logout = _ => {
      localStorage.removeItem("token");
      setLogged(false)
    }


  return (
    <div className="App">
      <div  className="container">
        <div className="navigation">
          { logged ? null : <NavLink to = '/register'><Button type="danger">Register</Button></NavLink>}
          { logged ? <NavLink to = '/'><Button type="danger" onClick={logout}>Logout</Button></NavLink> : <NavLink to = '/login'><Button type="danger">Login</Button></NavLink>}
          <NavLink to = '/images'><Button type="primary" >Images</Button></NavLink>
          <NavLink to = '/addimages'><Button type="primary" >Add Images</Button></NavLink>
          <NavLink to = '/cloudinary'><Button type="primary" >Cloud Images</Button></NavLink>
          <NavLink to = '/cloudupload'><Button type="primary" >Cloud Upload</Button></NavLink>
          <NavLink to = '/flexpups'><Button type="warning">Puppies!</Button></NavLink>
        </div>
      </div>
      <Route path = '/register' component = {Register} />
      <Route path = '/login' render = {(props) => <Login {...props} setLogged={setLogged} />} />
      <Route path = '/addimages' component = {AddImages} />
      <Route path = '/images' component = {ImagesData} />
      <Route path = '/cloudinary' component = {CloudHome} />
      <Route path = '/cloudupload' component = {CloudUpload} />
      <Route path = '/flexpups' render = {(props) => <PetGrid {...props} />} />

      <Route exact path = '/' render={() =>
      <div>
        <h1 className="logoheader">🆂🅷🅾🅿🅰🅻🅸</h1>
        <NavLink to='/login'><img className="ship" alt="logo ship" src={logo} /></NavLink>
      </div>
      } />

  </div>
  );
}

export default App;
