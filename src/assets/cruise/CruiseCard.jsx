import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import msc from "../images/cruise/msc.png";
import costa from "../images/cruise/costa.png";
import cunard from "../images/cruise/cunard.png";
import norwegian from "../images/cruise/nowegian.png";
import princess from "../images/cruise/princess.png";
import regent from "../images/cruise/regent.png";
import royal from "../images/cruise/royal.png";

const CruiseCard = () => {
  const cruises = [
    { id: 1, image: msc, title: "MSC Cruzeiros" },
    { id: 2, image: costa, title: "Costa Cruzeiros" },
    { id: 3, image: cunard, title: "Cunard Line" },
    { id: 4, image: norwegian, title: "Norwegian Cruise Line" },
    { id: 5, image: princess, title: "Princess Cruises" },
    { id: 6, image: regent, title: "Regent Seven Seas Cruises" },
    { id: 7, image: royal, title: "Royal Caribbean" },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl text-center font-bold mb-8 text-white uppercase tracking-wide">
        Nossos Cruzeiros
      </h2>
      <Swiper
        slidesPerView={3} // Exibe 3 itens por vez
        centeredSlides={true} // Centraliza o slide ativo
        spaceBetween={30} // Espaçamento entre slides
        loop={true} // Loop infinito
        autoplay={{
          delay: 2500, // Tempo entre slides
          disableOnInteraction: false, // Continua rodando após interação
        }}
        pagination={{ clickable: true }} // Navegação por pontos
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {cruises.map((cruise) => (
          <SwiperSlide key={cruise.id}>
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl transition-transform transform hover:scale-105">
              <img
                src={cruise.image}
                alt={cruise.title}
                className="w-80 h-64 object-cover rounded-lg"
              />
              <div className="mt-4 w-full px-6 py-3 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-wide">
                {cruise.title}
              </div>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110">
                Tenho Interesse
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CruiseCard;
