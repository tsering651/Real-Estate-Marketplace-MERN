// src/components/ImageCard.js
import React from 'react';

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="max-w-sm m-2 overflow-hidden">
      <img className="rounded-2xl" src={imageUrl} style={{ maxWidth: '90%', maxHeight: '200px' , width : '100%' , height :'auto' }}  />
    </div>
  );
};

export default ImageCard;
