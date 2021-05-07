import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth"

function ImageList() {

    const [ImageList, setImageList] = useState([])

    useEffect(() => {
        axiosWithAuth().get('http://localhost:3300/api/images')
        .then(res => {
            console.log("users post response" , res.data);
            setImageList(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);


  return (
    <div>
        {(ImageList.length > 0 )
        ? ImageList.map(imagedata =>
            <div key={imagedata.id} className="data-card">
                <h3>Image ID: {imagedata.id}</h3>
                <img src={imagedata.image_url}></img>
                <h3>Description: {imagedata.description}</h3>
                <h3>Price: {imagedata.price}</h3>
            </div>

        ): localStorage.getItem('token')
        ? <h1>Loading....</h1>
        : <h1>You shall not pass, You need to log in!</h1>
    }

    </div>

    );
}

export default ImageList;
