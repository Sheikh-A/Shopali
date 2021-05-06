import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth"

function FlexShipmentList() {

    const [FlexShipmentList, setFlexShipmentList] = useState([])

    useEffect(() => {
        axiosWithAuth().get('https://aliport.herokuapp.com/api/flex/shipments')
        .then(res => {
            console.log("users post response" , res.data);
            setFlexShipmentList(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);


  return (
    <div>
        {(FlexShipmentList.length > 0 )
        ? FlexShipmentList.map(flexdata =>
            <div key={flexdata.id} className="data-card">
                <h3>Shipment ID: {flexdata.id}</h3>
                <h3>Shipment Name: {flexdata.shipment_name}</h3>
                <h3>Client ID: {flexdata.client_id}</h3>
                <h3>Client Name: {flexdata.client_name}</h3>
            </div>

        ): localStorage.getItem('token')
        ? <h1>Loading....</h1>
        : <h1>You need to log in!</h1>
    }

    </div>

    );
}

export default FlexShipmentList;
