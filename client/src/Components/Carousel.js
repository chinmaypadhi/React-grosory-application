import React from "react";

import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";

import image2 from "../images/carousel2.1.jpg";
import image1 from "../images/carousel1.png";
import image3 from "../images/carousel5.jpg";

const MyCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image2} alt="Second slide" />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={image3} alt="Third slide" />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
