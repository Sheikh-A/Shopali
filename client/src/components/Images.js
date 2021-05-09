import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth"

function ImageList() {

    const [ImageList, setImageList] = useState([])
    const [imageDeleted, setImageDeleted] = useState(false);
    const [reloadingImages, setReloadingImages] = useState(false);


    imageDeleted(false);

    useEffect(() => {
        axiosWithAuth().get('https://backend-shopali.herokuapp.com/api/images')
        .then(res => {
            console.log("users post response" , res.data);
            setImageList(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [reloadingImages]);

    const deleteImage = (image_id) => {

        axiosWithAuth()
          .delete(`https://backend-shopali.herokuapp.com/api/images/${image_id}`)
          .then((res) => {
            console.log("DELETE deleteImage EditProduct.js: ", res);
            setReloadingImages(!reloadingImages);

            setImageDeleted(true);
            setTimeout(function () {
                setImageDeleted(false);
        }, 4000);
          })
          .catch((err) => {
            console.log("deleteImage ", err.message);
          });
      };


  return (
    <div>
        {(ImageList.length > 0 )
        ? ImageList.map(imagedata =>
            <div key={imagedata.id} className="data-card">
                <h3>Item Name: {imagedata.description}</h3>
                <img src={imagedata.image_url} alt="Image URL"></img>
                <h3>Image ID: {imagedata.id}</h3>
                <h3>Price: ${imagedata.price}</h3>
                <button onClick={() => deleteImage(imagedata.id)}>Delete Image</button>
            </div>

        ): localStorage.getItem('token')
        ? <h1>Loading....</h1>
        : <h1>You shall not pass, You need to log in!</h1>
    }

    </div>

    );
}

export default ImageList;
