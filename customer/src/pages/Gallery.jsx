import React, { useState } from 'react';
import ImageCard from "../components/ImageCards";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image1 from './gallery/3d-house-model-with-modern-architecture.jpg';
import image12 from './gallery/ann.jpg';
import image2 from './gallery/3d-rendering-house-model (1).jpg';
import image3 from './gallery/3d-rendering-house-model (2).jpg';
import image4 from './gallery/3d-rendering-house-model.jpg';
import image5 from './gallery/a.jpg';
import image8 from './gallery/f.jpg';
import image9 from './gallery/ad.jpg';
import image10 from './gallery/as.jpg';
import image11 from './gallery/assd.jpg';
import image6 from './gallery/house-isolated-field.jpg';

export default function Gallery() {
  const images = [
    { imageUrl: image1 },
    { imageUrl: image12 },
    { imageUrl: image6 },
    { imageUrl: image4 },
    { imageUrl: image5 },
  ];

  const cards = [
    { imageUrl: image1 },
    { imageUrl: image2 },
    { imageUrl: image3 },
    { imageUrl: image4 },
    { imageUrl: image5 },
    { imageUrl: image6 },
    { imageUrl: image8 },
    { imageUrl: image9 },
    { imageUrl: image10 },
    { imageUrl: image11 },
    { imageUrl: image12 },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const marginTop = '10px';

  return (
    <div className="bg-slate-200 min-h-screen">
      <Carousel autoPlay infiniteLoop interval={3000} showStatus={false} showThumbs={false}>
        {images.map((image, index) => (
          <div key={index} style={{ marginTop }}>
            <img
              src={image.imageUrl}
              alt={image.description}
              style={{
                maxWidth: '100%',
                maxHeight: '750px',
                width: '99.5%',
                height: 'auto',
              }}
            />
          </div>
        ))}
      </Carousel>

      <div className=" grid grid-cols-4 p-1 cursor-pointer items-center bg-slate-300" style={{ maxHeight: 'calc(200vh - 200px)', overflowY: 'auto' }}>
        {cards.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(index)}>
            <ImageCard imageUrl={image.imageUrl} />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-75 z-50"
          onClick={handleClose}
        >
          <div className="max-w-xl max-h-screen p-2 bg-white rounded-xl ">
            <img
              src={cards[selectedImage].imageUrl}
              alt="Enlarged Image"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
