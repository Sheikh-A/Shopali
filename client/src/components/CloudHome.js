import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:3300/api/cloudinary');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloud Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageIds, index) => (
                        <Image
                            key={index}
                            cloudName="shopali"
                            publicId={imageIds}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}
