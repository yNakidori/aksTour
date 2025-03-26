import React from "react";
import Slider from "react-slick";
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
  };

  const slides = [
    {
      src: CT5,
      title: "Descubra Novos Destinos",
      subtitle: "Viajar é colecionar momentos inesquecíveis.",
    },
    {
      src: CT6,
      title: "Aventuras Inesquecíveis",
      subtitle: "O mundo é um livro e quem não viaja lê apenas uma página.",
    },
    {
      src: CT7,
      title: "Saia da Rotina",
      subtitle: "A vida começa fora da sua zona de conforto.",
    },
    {
      src: CT8,
      title: "Explore Novos Horizontes",
      subtitle: "Descubra novos lugares e inspire-se com cada jornada.",
    },
  ];

  return (
    <div className="w-full h-screen relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-screen object-cover"
            />
            <div className="mt-44 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-6 text-white rounded-lg text-center max-w-6xl">
              <h2 className="text-8xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TravelCarousel;
