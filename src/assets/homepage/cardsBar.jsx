import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@mui/joy/Modal";
import { Box, Typography, Button } from "@mui/joy";
import destinations from "./destinationsData";

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenModal = (card) => setSelectedCard(card);
  const handleCloseModal = () => setSelectedCard(null);

  return (
    <div className="text-center mt-14">
      <h1 className="text-4xl font-bold text-gray-800">Destinos Populares</h1>
      <div className="h-1 w-16 bg-blue-500 mx-auto mt-2"></div>

      {/* Área dos Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {destinations.map((dest, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white max-w-xs"
            onClick={() => handleOpenModal(dest)}
          >
            <img
              src={dest.image}
              alt={dest.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{dest.title}</h2>
              <p className="text-gray-500">{dest.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Moderno */}
      {selectedCard && (
        <Modal open={!!selectedCard} onClose={handleCloseModal}>
          <Box className="bg-white p-6 rounded-lg max-w-4xl mx-auto mt-20 shadow-xl relative">
            {/* Botão Fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            {/* Container Principal */}
            <div className="flex flex-col lg:flex-row">
              {/* Imagem e Carrossel */}
              <div className="w-full lg:w-1/2 flex flex-col gap-3">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="rounded-lg shadow-md w-full"
                />
                <div className="flex gap-2 overflow-x-auto">
                  {selectedCard.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Slide ${idx}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                    />
                  ))}
                </div>
              </div>

              {/* Informações do Destino */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col">
                <Typography
                  level="h4"
                  className="font-bold text-gray-800 text-3xl"
                >
                  {selectedCard.title}
                </Typography>
                <Typography className="text-gray-500 mt-1 text-lg">
                  {selectedCard.location}
                </Typography>
                <Typography className="mt-4 text-gray-700">
                  {selectedCard.description}
                </Typography>

                {/* Preço e Botão */}
                <div className="mt-6 flex justify-between items-center">
                  <Typography
                    level="h5"
                    className="text-2xl font-semibold text-blue-600"
                  >
                    {selectedCard.price}
                  </Typography>
                  <Button size="lg" variant="solid" color="primary">
                    Comprar Pacote
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CardsBar;
