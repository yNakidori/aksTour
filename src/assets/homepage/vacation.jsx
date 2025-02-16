import React, { useEffect, useState } from "react";
import axios from "axios";
import "./vacation.css";

const destinations = [
  {
    name: "Bruxelas, Bélgica",
    query: "brussels",
    description:
      "Explore a Grand Place, experimente os famosos waffles e visite o Atomium.",
  },
  {
    name: "Roma, Itália",
    query: "rome",
    description:
      "Visite o Coliseu, o Vaticano e saboreie uma autêntica pasta italiana.",
  },
  {
    name: "Londres, Inglaterra",
    query: "london",
    description:
      "Conheça o Big Ben, a Tower Bridge e os famosos museus londrinos.",
  },
  {
    name: "Barcelona, Espanha",
    query: "barcelona",
    description:
      "Descubra a arquitetura de Gaudí e relaxe nas praias mediterrâneas.",
  },
  {
    name: "Amsterdã, Holanda",
    query: "amsterdam",
    description:
      "Passeie pelos canais, visite museus e explore os mercados de flores.",
  },
  {
    name: "Copenhague, Dinamarca",
    query: "copenhagen",
    description:
      "Admire a estátua da Pequena Sereia, explore Nyhavn e visite os jardins de Tivoli.",
  },
];

const Vacation = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const requests = destinations.map((dest) =>
          axios.get("https://api.pexels.com/v1/search", {
            headers: {
              Authorization:
                "ZhQzWiPCEQ7WZBr8VoPrwy6QRdNP7pvuRXydUyZd4w5kRBC6MnkVmb8f",
            },
            params: { query: dest.query, per_page: 1 },
          })
        );

        const responses = await Promise.all(requests);
        const images = responses.map((res, index) => ({
          id: index,
          src: res.data.photos[0]?.src.large,
          name: destinations[index].name,
          description: destinations[index].description,
        }));

        setMedia(images);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Destinos Imperdíveis na Europa
        </h1>
        <div className="h-1 w-16 bg-orange-500 mx-auto mt-2 mb-6"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.map((item) => (
          <div
            key={item.id}
            className="rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vacation;
