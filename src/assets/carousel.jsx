import React from "react";
import Slider from "react-slick";
import { ArrowDown } from "lucide-react";
import map from "../assets/images/mapa.jpg";
import CT5 from "../assets/images/caribe.jpg";
import CT6 from "../assets/images/capadocia.jpg";
import CT7 from "../assets/images/liberdade.jpg";
import CT8 from "../assets/images/bariloche.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TravelCarousel = () => {
  const navigate = useNavigate();

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
    >
      <ChevronLeft size={28} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
    >
      <ChevronRight size={28} />
    </button>
  );

  const handleDestinyClick = () => {
    navigate("/destinys/internacionais");
  };

  const handleServicesClick = () => {
    navigate("/services");
  };

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
      src: map,
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
            {/* Fundo escuro e conteúdo central */}
            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="flex justify-center items-center h-full relative">
                {/* Texto central */}
                <div className="text-center text-white p-6 max-w-4xl z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 typing-animation">
                    {slide.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Card esquerdo */}
                <div className="absolute left-6 lg:ml-20 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-xl shadow-lg p-4 w-60 z-10 hidden lg:block">
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
                <div className="absolute right-6 lg:mr-20 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-xl shadow-lg p-4 w-60 z-10 hidden lg:block">
                  <h3 className="text-sm font-bold uppercase text-gray-500 mb-1">
                    Todos os destinos
                  </h3>
                  <h2 className="text-xl font-bold text-green-700">
                    Viagens Inesquecíveis
                  </h2>
                  <p className="text-sm mt-2">
                    Conheça os cinco continentes em viagens inesquecíveis!{" "}
                    <br />
                    Descubra o mundo conosco!
                  </p>
                  <button
                    onClick={handleDestinyClick}
                    className="mt-4 text-green-600 font-semibold hover:underline"
                  >
                    SAIBA MAIS
                  </button>
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
