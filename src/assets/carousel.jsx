import React from "react";
import Slider from "react-slick";
import CT4 from "../assets/images/CT4.jpg";
import CT5 from "../assets/images/caribe.jpg";
import CT6 from "../assets/images/capadocia.jpg";
import CT7 from "../assets/images/liberdade.jpg";
import CT8 from "../assets/images/bariloche.jpg";

const TravelCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    //{ src: CT1, alt: "Image 1" },
    { src: CT5, alt: "Image 2" },
    { src: CT6, alt: "Image 3" },
    { src: CT7, alt: "Image 4" },
    { src: CT8, alt: "Image 5" },
  ];

  return (
    <div className="w-full h-screen">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-screen object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TravelCarousel;
