import React, { useRef } from "react";
import Slider from "react-slick";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import maldivas from "../assets/videos/maldivas.mp4";
import capadoccia from "../assets/videos/capadoccia.mp4";
import newyork from "../assets/videos/newyork.mp4";
import bariloche from "../assets/videos/bariloche.mp4";
import italy from "../assets/videos/italy.mp4";
import swiss from "../assets/videos/swiss.mp4";
import israel from "../assets/videos/israel.mp4";
import safari from "../assets/videos/safari.mp4";
import london from "../assets/videos/london.mp4";
import salvador from "../assets/videos/salvador.mp4";

import passaporte from "../assets/images/passaporte.png";
import mapa from "../assets/images/mapa.png";

const TravelCarousel = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleDestinyClick = () => navigate("/destinys/internacionais");
  const handleServicesClick = () => navigate("/services");

  const settings = {
    dots: true,
    infinite: true,
    speed: 1100,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const slides = [
    {
      src: maldivas,
      title: "",
      subtitle: "Um paraíso tropical de águas cristalinas.",
    },
    {
      src: bariloche,
      title: "Bariloche",
      subtitle: "Belezas naturais e aventura na neve.",
    },
    {
      src: newyork,
      title: "Nova York",
      subtitle: "A cidade que nunca dorme, cheia de energia e cultura.",
    },
    {
      src: italy,
      title: "Itália",
      subtitle: "Arte, história e gastronomia em cada esquina.",
    },
    {
      src: israel,
      title: "Israel",
      subtitle: "Descubra a história e a cultura milenar.",
    },
    {
      src: swiss,
      title: "Suíça",
      subtitle: "Paisagens de tirar o fôlego e chocolates irresistíveis.",
    },
    {
      src: capadoccia,
      title: "Capadócia",
      subtitle: "Uma viagem entre balões e paisagens surreais.",
    },
    {
      src: london,
      title: "Londres",
      subtitle: "História e modernidade lado a lado.",
    },
    {
      src: salvador,
      title: "Salvador",
      subtitle: "Axé, alegria e praias encantadoras.",
    },
    {
      src: safari,
      title: "Safari",
      subtitle: "Explore a vida selvagem em sua forma mais pura.",
    },
  ];

  const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full h-screen relative">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full">
            <video
              src={slide.src}
              className="w-full h-screen object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="flex justify-center items-center h-full relative">
                {/* Texto central */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-4 z-10 text-center">
                  {index === 0 ? (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                      Viva momentos Incríveis, Viaja!
                    </h2>
                  ) : (
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                      {slide.subtitle}
                    </p>
                  )}
                </div>

                {/* Nome do destino no canto superior direito */}
                {slide.title && (
                  <div className="absolute top-4 right-4 text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold bg-black/40 px-3 py-1 rounded-full z-10">
                    {slide.title}
                  </div>
                )}

                {/* Card esquerdo - Visto de Turismo */}
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2 ml-8 w-[220px] h-[320px] bg-cover bg-center rounded-2xl shadow-xl overflow-hidden z-10 hidden lg:flex"
                  style={{
                    backgroundImage: `url(${passaporte})`,
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-end items-center p-4 text-white text-center gap-2">
                    <h2 className="text-xl font-bold">Visto de Turismo</h2>
                    <p className="text-sm leading-snug">
                      Rápido, simples e sem erros! <br />
                      Você viaja tranquilo <br />e a gente cuida de tudo!
                    </p>
                    <button
                      onClick={handleServicesClick}
                      className="bg-white text-blue-800 font-semibold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                      SAIBA MAIS
                    </button>
                  </div>
                </div>

                {/* Card direito - Todos os destinos */}
                <div
                  className="absolute top-1/2 right-0 -translate-y-1/2 mr-8 w-[220px] h-[320px] bg-cover bg-center rounded-2xl shadow-xl overflow-hidden z-10 hidden lg:flex"
                  style={{
                    backgroundImage: `url(${mapa})`,
                  }}
                >
                  <div className="w-full h-full bg-black bg-opacity-20 flex flex-col justify-end items-center p-4 text-white text-center gap-2">
                    <h2 className="text-xl font-bold">Todos os destinos</h2>
                    <p className="text-sm leading-snug">
                      Conheça os cinco continentes <br />
                      em viagens inesquecíveis! <br />
                      Descubra o mundo conosco!
                    </p>
                    <button
                      onClick={handleDestinyClick}
                      className="bg-white text-blue-800 font-semibold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                      SAIBA MAIS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Ícone de rolagem */}
      <div className="bg-black opacity-55 w-full h-20 absolute bottom-0">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white justify-center items-center flex font-poppins">
          Conheça nossos pacotes
        </p>
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="text-white text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default TravelCarousel;
