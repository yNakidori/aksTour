import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@mui/joy/Modal";
import { Box, Typography, Button } from "@mui/joy";
import destinations from "./destinationsData";

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const whatsappNumber = "5511957700305";
  const whatsappLink = selectedCard
    ? `https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse em conhecer o destino: ${selectedCard.title}.`
    : `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="text-center mt-14">
      <h1 className="text-4xl font-bold text-gray-800">Destinos Populares</h1>
      <div className="h-1 w-16 bg-blue-400 mx-auto mt-2"></div>

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {destinations.map((dest, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }} // Faz a animação ocorrer apenas uma vez
            className="relative cursor-pointer rounded-[20px] p-4 shadow-xl w-80 text-white"
            style={{
              background: "linear-gradient(to bottom right, #0093E9, #80D0C7)",
            }}
            onClick={() => setSelectedCard(dest)}
          >
            <img
              src={dest.image}
              alt={dest.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="mt-4">
              <h2 className="text-xl font-bold">{dest.title}</h2>
              <p className="text-sm opacity-80">{dest.location}</p>
            </div>
            <div className="absolute top-4 right-4 bg-yellow-300 text-black px-2 py-1 font-bold rounded">
              <p> Em alta!</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCard && (
        <Modal open={!!selectedCard} onClose={() => setSelectedCard(null)}>
          <Box className="bg-gray-300 bg-opacity-85 p-6 rounded-lg max-w-5xl mx-auto mt-20 shadow-xl flex flex-col md:flex-row gap-6">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                  src={selectedCard.image}
                  alt="Imagem principal"
                />
              </div>
              <div className="grid grid-cols-5 gap-4">
                {selectedCard.images?.map((img, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 cursor-pointer rounded-lg overflow-hidden"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={img}
                      alt={`Imagem ${index + 1}`}
                      onClick={() =>
                        setSelectedCard({ ...selectedCard, image: img })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center w-full md:w-1/2">
              <Typography level="h4" className="font-bold text-3xl">
                {selectedCard.title}
              </Typography>
              <Typography className="text-gray-500 mt-1 text-lg">
                {selectedCard.location}
              </Typography>
              <Typography className="mt-4 text-gray-700">
                {selectedCard.description}
              </Typography>
              <div className="mt-6 flex justify-between items-center">
                <Typography
                  level="h5"
                  className="text-2xl font-semibold text-blue-600"
                >
                  {selectedCard.price}
                </Typography>
                <Button
                  size="lg"
                  variant="solid"
                  color="primary"
                  onClick={handleWhatsAppClick}
                >
                  Comprar Pacote
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CardsBar;
