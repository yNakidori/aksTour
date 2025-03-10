import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import e4 from "./assets/images/events/e4.png";
import e6 from "./assets/images/events/6.png";
import e3 from "./assets/images/events/e3.png";
import loola from "./assets/images/events/lollapalooza.png";
import f1 from "./assets/images/events/f1.png";
import bgs from "./assets/images/events/bgs.png";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

const eventSuggestions = [
  {
    id: 1,
    title: "Lollapalooza",
    image: loola,
    description:
      "28, 29 e 30 de Março - 2025. Autódromo de Interlagos, São Paulo.",
  },
  {
    id: 2,
    title: "F1 2025",
    image: f1,
    description: "Cronograma completo do Grande Prêmio do Brasil de Fórmula 1.",
  },
  {
    id: 3,
    title: "BGS 2025",
    image: bgs,
    description: "Brasil Game Show 2025. De 8 a 12 de Outubro.",
  },
];

const Events = () => {
  const [search, setSearch] = useState("");

  const filteredEvents = eventSuggestions.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen">
        {/* Carrossel de Imagens */}
        <div className="absolute top-0 left-0 w-full h-screen -z-10">
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div>
              <img
                src={e4}
                alt="Banner 1"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src={e6}
                alt="Banner 2"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src={e3}
                alt="Banner 3"
                className="w-full h-screen object-cover"
              />
            </div>
          </Carousel>
        </div>

        {/* Conteúdo da página */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 text-white p-6">
          <h1 className="text-4xl font-bold mb-6">Eventos</h1>

          {/* Campo de busca */}
          <div className="max-w-4xl w-full mb-6">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white text-black p-4 rounded-lg shadow-lg"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
