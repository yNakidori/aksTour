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
    <div className="my-8 md:my-12 mb-4 px-2 md:px-0">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 1, spaceBetween: 25 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        centeredSlides={true}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper pb-12"
      >
        {cruises.map((cruise) => (
          <SwiperSlide key={cruise.id}>
            <div className="flex flex-col items-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl transition-transform transform hover:scale-105 active:scale-95 mx-2 h-[400px] sm:h-[450px] md:h-[500px]">
              <div className="w-full overflow-hidden rounded-lg md:rounded-xl flex-shrink-0">
                <img
                  src={cruise.image}
                  alt={cruise.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="mt-3 md:mt-4 w-full px-3 md:px-6 py-2 md:py-3 text-center text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-wide flex-grow flex items-center justify-center min-h-[80px] md:min-h-[90px]">
                {cruise.title}
              </div>
              <button className="mt-3 md:mt-4 px-5 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm md:text-base font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 flex-shrink-0">
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
