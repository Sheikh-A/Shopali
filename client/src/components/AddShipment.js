import React, {useState} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import { Redirect } from "react-router-dom";

const AddShipment = () => {
  const [formData, setFormData] = useState({
    shipment_name: "",
    client_id: "",

  });

  const [home, setHome] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://aliport.herokuapp.com/api/flex/shipments", formData)
      .catch((err) => console.log(err));
    setFormData({
      shipment_name: "",
      client_id: "",
    });
    setHome(true);
  };
  return (
    <div className="registerContainer negative-top-margin-adjustment">
      {home ? <Redirect to="/flexshipments" /> : null}
      <div>
        <div>
          <h1> Add Shipment</h1>
        </div>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <div>
              <label htmlFor="shipment_name">Shipment Name</label>
              <input
                id="firstName"
                name="shipment_name"
                type="text"
                value={formData.shipment_name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="client_id">Client ID</label>
              <input
                id="firstName"
                name="client_id"
                type="number"
                value={formData.client_id}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <button className="blackButton" type="submit">Add</button>
      </form>
    </div>
  </div>
  );
};

export default AddShipment;
