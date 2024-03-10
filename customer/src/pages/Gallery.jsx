import ImageCard from "../components/ImageCards";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "./gallery/3d-house-model-with-modern-architecture.jpg";
import image12 from "./gallery/ann.jpg";
import image2 from "./gallery/3d-rendering-house-model (1).jpg";
import image3 from "./gallery/3d-rendering-house-model (2).jpg";
import image4 from "./gallery/3d-rendering-house-model.jpg";
import image5 from "./gallery/a.jpg";
import image8 from "./gallery/f.jpg";
import image9 from "./gallery/ad.jpg";
import image10 from "./gallery/as.jpg";
import image11 from "./gallery/assd.jpg";
import image6 from "./gallery/house-isolated-field.jpg";
import image7 from "./gallery/d.avif";

export default function Gallery() {
  const images = [
    { imageUrl: image1},
    { imageUrl: image12},
    { imageUrl: image2},
    { imageUrl: image3},
    { imageUrl: image6},
    { imageUrl: image4},
    { imageUrl: image5},
    { imageUrl: image7},
    { imageUrl: image8},
  ];

  const cards = [
    { imageUrl: image1},
    { imageUrl: image2},
    { imageUrl: image3},
    { imageUrl: image4},
    { imageUrl: image5},
    { imageUrl: image6},
    { imageUrl: image7},
    { imageUrl: image8},
    { imageUrl: image9},
    { imageUrl: image10},
    { imageUrl: image11},
    { imageUrl: image12 },
  ];
  const interval = 3000; // Interval between slides in milliseconds
  const marginTop = "30px";

  return (
    <div className="bg-blue-100 min-h-screen">
      <Carousel
        autoPlay
        infiniteLoop
        interval={interval}
        showStatus={false}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div key={index} style={{ marginTop }}>
            <img
              src={image.imageUrl}
              alt={image.description}
              style={{
                maxWidth: "100%",
                maxHeight: "750px",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        ))}
      </Carousel>

      <div className="flex flex-wrap justify-center">
        {cards.map((image, index) => (
          <ImageCard key={index} imageUrl={image.imageUrl}/>
        ))}
      </div>
    </div>
  );
}
