import React, { useRef } from "react";
import rio from "../images/customcards/rio.png";
import porto from "../images/customcards/porto.png";
import brasilia from "../images/customcards/brasilia.png";
import recife from "../images/customcards/recife.png";
import galinhas from "../images/customcards/galinhas.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const CustomNationalCard = () => {
  const cardData = [
    {
      id: 1,
      destiny: "Rio de Janeiro",
      price: "4x de R$ 164",
      image: rio,
    },
    {
      id: 2,
      destiny: "Porto Alegre",
      price: "4x de R$ 158",
      image: porto,
    },
    {
      id: 3,
      destiny: "Brasília",
      price: "4x de R$ 118",
      image: brasilia,
    },
    {
      id: 4,
      destiny: "Recife",
      price: "4x de R$ 320",
      image: recife,
    },
    {
      id: 5,
      destiny: "Porto de Galinhas",
      price: "4x de R$ 258",
      image: galinhas,
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

export default CustomNationalCard;
