import React from "react";
import Slider from "react-slick";
import CT1 from "../assets/images/CT1.jpg";
import CT2 from "../assets/images/CT2.jpg";
import CT3 from "../assets/images/CT3.jpg";
import CT4 from "../assets/images/CT4.jpg";

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
    { src: CT1, alt: "Image 1" },
    { src: CT2, alt: "Image 2" },
    { src: CT3, alt: "Image 3" },
    { src: CT4, alt: "Image 4" },
  ];

  return (
    <div className="w-full mx-0">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              style={{ height: "85vh" }}
              className="w-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TravelCarousel;
