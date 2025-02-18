import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import e1 from "./assets/images/events/e1.png";
import e2 from "./assets/images/events/e2.png";
import e3 from "./assets/images/events/e3.png";

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
      <div className="min-h-screen bg-gray-100">
        {/* Carrossel de Imagens */}
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          <div>
            <img src={e1} alt="Banner 1" />
          </div>
          <div>
            <img src={e2} alt="Banner 2" />
          </div>
          <div>
            <img src={e3} alt="Banner 3" />
          </div>
        </Carousel>

        {/* Campo de busca */}
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <input
            type="text"
            placeholder="Buscar eventos..."
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Lista de eventos */}
      </div>
    </div>
  );
};

export default Events;
