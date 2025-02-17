import React, { useState, useEffect } from "react";
import axios from "axios";

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
        {/* Banner */}
        <div
          className="relative h-64 bg-cover bg-center flex items-center justify-center text-white text-3xl font-bold"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/1600x400/?travel')",
          }}
        >
          Eventos Disponíveis 🎟️
        </div>

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
