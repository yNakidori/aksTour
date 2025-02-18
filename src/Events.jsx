import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import e4 from "./assets/images/events/e4.png";
import e5 from "./assets/images/events/e5.png";
import e3 from "./assets/images/events/e3.png";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

const API_KEY = "";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://api.ingresse.com/events?apikey=${API_KEY}&size=10`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen">
        {/* Carrossel de Imagens - Como fundo */}
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
                src={e5}
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
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 text-white">
          <h1 className="text-4xl font-bold mb-6">Eventos</h1>

          {/* Campo de busca */}
          <div className="max-w-4xl mx-auto px-4">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de eventos */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
