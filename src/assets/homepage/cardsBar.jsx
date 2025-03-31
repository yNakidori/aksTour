import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@mui/joy/Modal";
import { Box, Typography, Button } from "@mui/joy";
import destinations from "./destinationsData";

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para imagem ampliada

  const handleOpenModal = (card) => setSelectedCard(card);
  const handleCloseModal = () => setSelectedCard(null);
  const handleOpenImage = (image) => setSelectedImage(image);
  const handleCloseImage = () => setSelectedImage(null);

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
            className="cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-blue-200 max-w-xs border-4 border-transparent hover:border-yellow-300 transition-all duration-300"
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

      {/* Modal de Destino */}
      {selectedCard && (
        <Modal open={!!selectedCard} onClose={handleCloseModal}>
          <Box className="bg-gray-200 p-6 rounded-lg max-w-7xl mx-auto mt-20 shadow-xl relative">
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
                  className="rounded-lg shadow-md w-full cursor-pointer"
                  onClick={() => handleOpenImage(selectedCard.image)} // Clique para abrir modal
                />
                <div className="flex gap-2 overflow-x-auto">
                  {selectedCard.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Slide ${idx}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                      onClick={() => handleOpenImage(img)} // Clique para abrir modal da miniatura
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

      {/* Modal para ampliar a imagem */}
      {selectedImage && (
        <Modal open={!!selectedImage} onClose={handleCloseImage}>
          <Box className="bg-white p-4 rounded-lg max-w-5xl mx-auto mt-20 shadow-xl relative flex justify-center items-center">
            {/* Botão Fechar */}
            <button
              onClick={handleCloseImage}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            {/* Imagem ampliada */}
            <img
              src={selectedImage}
              alt="Imagem Ampliada"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CardsBar;
