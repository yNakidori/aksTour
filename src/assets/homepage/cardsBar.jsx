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
          <Box className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl max-w-6xl w-full mx-auto shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Seção de Imagens */}
                <div className="lg:w-1/2 space-y-4">
                  <div className="relative group">
                    <img
                      className="w-full h-80 rounded-2xl object-cover shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                      src={selectedCard.image}
                      alt="Imagem principal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                  
                  {/* Galeria de imagens */}
                  {selectedCard.images && selectedCard.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {selectedCard.images.slice(0, 4).map((img, index) => (
                        <div
                          key={index}
                          className="relative h-20 cursor-pointer rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-200"
                          onClick={() => setSelectedCard({ ...selectedCard, image: img })}
                        >
                          <img
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                            src={img}
                            alt={`Imagem ${index + 1}`}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Seção de Informações */}
                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Disponível agora</span>
                    </div>
                    <Typography level="h4" className="font-bold text-3xl lg:text-4xl text-gray-800 mb-2">
                      {selectedCard.title}
                    </Typography>
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <Typography className="text-lg">
                        {selectedCard.location}
                      </Typography>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <Typography className="text-gray-700 leading-relaxed text-lg">
                      {selectedCard.description}
                    </Typography>
                  </div>

                  {/* Features destacadas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">Cancelamento grátis</span>
                    </div>
                    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-medium">Confirmação instantânea</span>
                    </div>
                  </div>

                  {/* Preço e ação */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-blue-100 text-sm">A partir de</p>
                        <Typography level="h5" className="text-3xl font-bold">
                          {selectedCard.price}
                        </Typography>
                        <p className="text-blue-100 text-sm">por pessoa</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-300 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-blue-100 text-sm">4.8 (324 avaliações)</p>
                      </div>
                    </div>
                    
                    <Button
                      size="lg"
                      variant="solid"
                      className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                      onClick={handleWhatsAppClick}
                    >
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388"/>
                      </svg>
                      Reservar via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Botão de fechar */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CardsBar;
