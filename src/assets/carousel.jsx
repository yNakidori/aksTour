import React, { useRef } from "react";
import Slider from "react-slick";
import { ArrowDown } from "lucide-react";
import capadoccia from "../assets/videos/capadoccia.mp4";
import india from "../assets/videos/india.mp4";
import kyoto from "../assets/videos/kyoto.mp4";
import london from "../assets/videos/london.mp4";
import salvador from "../assets/videos/salvador.mp4";
import savannah from "../assets/videos/savannah.mp4";
import { useNavigate } from "react-router-dom";

const TravelCarousel = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();

  const handleDestinyClick = () => navigate("/destinys/internacionais");
  const handleServicesClick = () => navigate("/services");

  const settings = {
    dots: true,
    infinite: true,
    speed: 1100,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      src: capadoccia,
      title: "Explore Capadócia",
      subtitle: "Uma viagem entre balões e paisagens surreais.",
    },
    {
      src: india,
      title: "Encantos da Índia",
      subtitle: "Cores, sabores e cultura em um só lugar.",
    },
    {
      src: kyoto,
      title: "Tradições de Kyoto",
      subtitle: "Flores, templos e a serenidade japonesa.",
    },
    {
      src: london,
      title: "Clássica Londres",
      subtitle: "História e modernidade lado a lado.",
    },
    {
      src: salvador,
      title: "Salvador",
      subtitle: "Axé, alegria e praias encantadoras.",
    },
    {
      src: savannah,
      title: "Savannah",
      subtitle: "Um charme sulista que conquista.",
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
              playsInline
              onEnded={goToNext}
            />

            {/* Fundo escuro e conteúdo central */}
            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="flex justify-center items-center h-full relative">
                {/* Texto central */}
                <div className="text-center text-white p-6 max-w-4xl z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 typing-animation">
                    {slide.title}
                  </h2>
                  <p className="text-base mb-28 sm:text-lg md:text-xl lg:text-2xl">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Card esquerdo */}
                <div className="absolute left-6 lg:ml-20 top-[75%] -translate-y-1/2 bg-white/90 text-black rounded-xl shadow-lg p-4 w-full max-w-xs md:max-w-xs z-10 hidden lg:block">
                  {" "}
                  <h3 className="text-sm font-bold uppercase text-gray-500 mb-1">
                    Seu passaporte para o mundo está aqui!
                  </h3>
                  <h2 className="text-xl font-bold text-blue-700">
                    Visto de Turismo
                  </h2>
                  <p className="text-sm mt-2">
                    Rápido, simples e sem erros! <br />
                    Você viaja tranquilo e a gente cuida de tudo!
                  </p>
                  <button
                    onClick={handleServicesClick}
                    className="mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    SAIBA MAIS
                  </button>
                </div>

                {/* Card direito */}
                <div className="absolute right-6 lg:mr-20 top-[75%] -translate-y-1/2 bg-white/90 text-black rounded-xl shadow-lg p-4 w-full max-w-xs md:max-w-xs z-10 hidden lg:block">
                  {" "}
                  <h3 className="text-sm font-bold uppercase text-gray-500 mb-1">
                    Todos os destinos
                  </h3>
                  <h2 className="text-xl font-bold text-blue-700">
                    Viagens Inesquecíveis
                  </h2>
                  <p className="text-sm mt-2">
                    Conheça os cinco continentes em viagens inesquecíveis!{" "}
                    <br />
                    Descubra o mundo conosco!
                  </p>
                  <button
                    onClick={handleDestinyClick}
                    className="mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    SAIBA MAIS
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Áreas clicáveis esquerda e direita */}
      <div
        onClick={goToPrev}
        className="absolute left-0 top-0 w-1/3 h-full cursor-pointer"
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      ></div>
      <div
        onClick={goToNext}
        className="absolute right-0 top-0 w-1/3 h-full cursor-pointer"
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      ></div>

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
