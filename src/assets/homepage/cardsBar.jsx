import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import destinations from "./destinationsData";

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const whatsappNumber = "5511957700305";
  const whatsappLink = selectedCard
    ? `https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse em conhecer o destino: ${selectedCard.title}.`
    : `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open(whatsappLink, "_blank");
      setIsLoading(false);
    }, 500);
  };

  const handleCardClick = (dest) => {
    setSelectedCard(dest);
    setSelectedImageIndex(0);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setSelectedImageIndex(0);
  };

  return (
    <div className="text-center mt-14 mb-20">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Destinos Populares
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Descubra os destinos mais procurados e crie memórias inesquecíveis
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {destinations.map((dest, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-yellow-400"
            onClick={() => handleCardClick(dest)}
          >
            {/* Card Image */}
            <div className="relative overflow-hidden">
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

              {/* Badge "Em alta" */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
                🔥 Em Alta!
              </div>

              {/* Overlay com informações */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">{dest.title}</h3>
                <div className="flex items-center text-sm opacity-90">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {dest.location}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {dest.price}
                </span>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
                Ver Detalhes
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Moderno */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-6xl w-full mx-auto shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col">
                {/* Seção de Imagem Principal - Movida para o topo */}
                <div className="relative">
                  <div className="relative h-80 overflow-hidden rounded-t-3xl">
                    <img
                      src={
                        selectedCard.images &&
                        selectedCard.images[selectedImageIndex]
                          ? selectedCard.images[selectedImageIndex]
                          : selectedCard.image
                      }
                      alt={selectedCard.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      Disponível agora
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        {selectedCard.title}
                      </h2>
                      <div className="flex items-center text-lg">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {selectedCard.location}
                      </div>
                    </div>

                    {/* Image Gallery Indicators */}
                    {selectedCard.images && selectedCard.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedCard.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleImageSelect(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === selectedImageIndex
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {selectedCard.images && selectedCard.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      {selectedCard.images.slice(0, 4).map((img, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageSelect(index)}
                          className={`relative h-16 w-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                            index === selectedImageIndex
                              ? "border-white scale-110"
                              : "border-white/50 hover:border-white/80"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Seção de Informações */}
                <div className="p-8 space-y-6">
                  {/* Description */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedCard.description}
                    </p>
                  </div>

                  {/* Features Grid - Apenas Suporte e Pagamento Seguro */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Suporte 24/7
                        </p>
                        <p className="text-sm text-gray-600">
                          Estamos aqui por você
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Pagamento seguro
                        </p>
                        <p className="text-sm text-gray-600">
                          Dados protegidos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price and Booking Section - Sem avaliações */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                      <div className="text-center md:text-left">
                        <p className="text-blue-100 text-sm mb-1">
                          A partir de
                        </p>
                        <div className="text-4xl md:text-5xl font-bold mb-2">
                          {selectedCard.price}
                        </div>
                        <p className="text-blue-100">por pessoa</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWhatsAppClick}
                        disabled={isLoading}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed min-w-[250px] justify-center"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <svg
                              className="animate-spin w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Abrindo WhatsApp...</span>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388" />
                            </svg>
                            <span>Reservar via WhatsApp</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardsBar;
