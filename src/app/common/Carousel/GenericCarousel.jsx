import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GenericCarousel = (props) => {
  const { images, className } = props;
  return (
    <Carousel>
      {images.map((img) => (
        <div>
          <img src={img.path} alt={img.alt ? img.alt : ""} />
          <p>{img.caption}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default GenericCarousel;
