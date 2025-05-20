import React from "react";
import Slider from "react-slick";
import { ArrowDown } from "lucide-react";
import CT5 from "../assets/images/caribe.jpg";
import CT6 from "../assets/images/capadocia.jpg";
import CT7 from "../assets/images/liberdade.jpg";
import CT8 from "../assets/images/bariloche.jpg";
import mundi from "../assets/images/mundi.png";

const TravelCarousel = () => {
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
      onClick={onClick}
    >
      ‹
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80"
      onClick={onClick}
    >
      ›
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 1100,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const slides = [
    {
      src: mundi,
      title: "Explore o Mundo",
      subtitle: "Descubra novos horizontes e viva experiências únicas.",
    },
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

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-screen relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full">
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-screen object-cover"
            />
            {/* Fundo escuro */}
            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white p-6 max-w-4xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 typing-animation">
                    {slide.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Icone de seta para rolagem */}
      <div className="bg-black opacity-55 w-full h-20 absolute bottom-0">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white justify-center items-center flex font-poppins">
          Conheça nossos pacotes
        </p>
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onMouseOver={scrollToNextSection}
        >
          <ArrowDown className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-9xl" />
        </div>
      </div>
    </div>
  );
};

export default TravelCarousel;
