import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import msc from "../images/cruise/msc.png";
import costa from "../images/cruise/costa.png";
import cunard from "../images/cruise/cunard.png";
import norwegian from "../images/cruise/nowegian.png";
import princess from "../images/cruise/princess.png";
import regent from "../images/cruise/regent.png";
import royal from "../images/cruise/royal.png";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const whatsappNumber = "5511957700305";

const CruiseCard = () => {
  const cruises = [
    { id: 1, image: msc, title: "MSC Cruzeiros", tag: "Popular" },
    { id: 2, image: costa, title: "Costa Cruzeiros", tag: "Mediterrâneo" },
    { id: 3, image: cunard, title: "Cunard Line", tag: "Luxo" },
    {
      id: 4,
      image: norwegian,
      title: "Norwegian Cruise Line",
      tag: "Aventura",
    },
    { id: 5, image: princess, title: "Princess Cruises", tag: "Romance" },
    { id: 6, image: regent, title: "Regent Seven Seas", tag: "Ultra Luxo" },
    { id: 7, image: royal, title: "Royal Caribbean", tag: "Família" },
  ];

  const handleInterest = (title) => {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no cruzeiro: ${title}`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  return (
    <div className="pb-4">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        }}
        centeredSlides={false}
        spaceBetween={24}
        loop={true}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className="pb-12"
      >
        {cruises.map((cruise) => (
          <SwiperSlide key={cruise.id}>
            <div
              className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "white",
                borderColor: `${palette.navy}15`,
                boxShadow: "0 4px 24px rgba(14,44,69,0.08)",
              }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={cruise.image}
                  alt={cruise.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Tag */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                  style={{
                    backgroundColor: `${palette.gold}ee`,
                    color: "white",
                  }}
                >
                  {cruise.tag}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col flex-grow p-6">
                <h3
                  className="text-lg font-bold mb-1 leading-snug"
                  style={{ color: palette.navy }}
                >
                  {cruise.title}
                </h3>
                <div
                  className="w-10 h-0.5 rounded-full mb-4"
                  style={{ backgroundColor: palette.gold }}
                />
                <div className="flex-grow" />
                <button
                  onClick={() => handleInterest(cruise.title)}
                  className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 border"
                  style={{
                    backgroundColor: palette.navy,
                    color: palette.pale,
                    borderColor: `${palette.navy}00`,
                  }}
                >
                  Tenho Interesse
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CruiseCard;
