import React, { useRef } from "react";
import veneza from "../images/veneza.png";
import disney from "../images/disney.png";
import bariloche from "../images/bariloche.png";
import cancun from "../images/cancun.png";
import buenosaires from "../images/buenosaires.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const CustomInternationalCard = () => {
  const cardData = [
    {
      id: 1,
      destiny: "Buenos Aires",
      price: "2219",
      image: buenosaires,
    },
    {
      id: 2,
      destiny: "Cancún",
      price: "3668",
      image: cancun,
    },
    {
      id: 3,
      destiny: "Bariloche",
      price: "3581",
      image: bariloche,
    },
    {
      id: 4,
      destiny: "Disney - Orlando",
      price: "5000",
      image: disney,
    },
    {
      id: 5,
      destiny: "Veneza",
      price: "4000",
      image: veneza,
    },
  ];

  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-10"
      >
        <ArrowLeftOutlined />
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 p-4 overflow-hidden scroll-smooth no-scrollbar"
      >
        {cardData.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-72 shrink-0"
          >
            {/* Imagem */}
            <img
              src={card.image}
              alt={card.destiny}
              className="w-full h-52 object-cover"
            />

            {/* Selo */}
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-lg mt-48">
              Pacote
            </span>

            {/* Conteúdo */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {card.destiny}
              </h2>
              <p className="text-gray-500 text-sm mt-2">Pacotes a partir de</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {card.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-10"
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
};

export default CustomInternationalCard;
