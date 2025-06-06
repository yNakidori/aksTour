import React from "react";
import ClientsCard from "./clientsCard";
import yosemite from "../images/review-yosemite.png";
import paris from "../images/review-paris.png";
import machupicchu from "../images/review-peru.png";

const Clients = () => {
  const clients = [
    {
      name: "Ana Silva",
      destination: "Yosemite Park",
      location: "California, USA",
      image: yosemite,
      review:
        "A viagem para Yosemite foi incrível! Cada trilha revelou vistas deslumbrantes, e o atendimento da agência tornou tudo muito mais especial. Mal posso esperar para a próxima aventura!",
    },
    {
      name: "Carlos Pereira",
      destination: "Paris",
      location: "França",
      image: paris,
      review:
        "Paris foi uma experiência inesquecível! A Torre Eiffel e os museus são de tirar o fôlego. A agência fez tudo acontecer de forma perfeita!",
    },
    {
      name: "Fernanda Oliveira",
      destination: "Machu Picchu",
      location: "Peru",
      image: machupicchu,
      review:
        "Explorar Machu Picchu foi um sonho realizado! A organização impecável da agência tornou tudo muito mais fácil e agradável.",
    },
  ];

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Experiências Reais</h1>
        <div className="h-1 w-16 bg-indigo-500 mx-auto mt-2 mb-6"></div>
      </div>
      <div
        className="mb-6"
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {clients.map((client, index) => (
          <ClientsCard
            key={index}
            name={client.name}
            destination={client.destination}
            location={client.location}
            image={client.image}
            review={client.review}
          />
        ))}
      </div>
    </>
  );
};

export default Clients;
