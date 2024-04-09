import React from "react";

const ImageCard = ({ imageUrl, onClick }) => {
  return (
    <div className="max-w-sm m-2 overflow-hidden">
      <img
        className="rounded-2xl border border-black p-1"
        src={imageUrl}
        style={{
          maxWidth: "90%",
          maxHeight: "200px",
          width: "100%",
          height: "auto",
        }}
        onClick={onClick} // Move onClick event handler here
      />
    </div>
  );
};

export default ImageCard;
