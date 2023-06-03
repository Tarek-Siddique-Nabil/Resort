import React from "react";
import Slider from "react-slick";
import ServiceHomePage from "../Service/ServiceHomePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgOne from "../Image/one.jpg";
import imgTwo from "../Image/two.jpg";
import imgThree from "../Image/three.jpg";
import imgFour from "../Image/four.jpg";

import { bgImage } from "../../Data/image";
import { TypeAnimation } from "react-type-animation";
const Home = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500000,
    cssEase: "linear",
  };
  return (
    <>
      <Slider {...settings} className="overflow-hidden -z-20 ">
        <div>
          <div className="absolute inset-0 w-full h-full z-50"></div>
          <figure>
            <img src={imgOne} className="w-full h-screen " />
          </figure>
        </div>
        <div>
          <img src={imgTwo} className="w-full h-screen" />
        </div>
        <div>
          <img src={imgThree} className="w-full h-screen" />
        </div>
        <div>
          <img src={imgFour} className="w-full h-screen" />
        </div>
      </Slider>

      <ServiceHomePage></ServiceHomePage>
    </>
  );
};

export default Home;
