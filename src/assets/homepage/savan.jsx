import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import savanaImage from "../images/safari.png";

const Savan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse em conhecer mais sobre os pacotes de Safari!`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };
  return (
    <>
      <div className="text-center mt-24">
        <h1 className="text-3xl font-bold text-gray-800">Explore o Safari</h1>
        <div className="h-1 w-16 bg-amber-300 mx-auto mt-2"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white rounded-3xl shadow-xl mt-4 max-w-7xl mx-auto">
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 leading-tight">
            É hora de <span className="italic text-blue-500">explorar</span>
          </h1>
          <p className="mt-6 text-gray-700 text-xl">
            Sinta a imensidão da savana, o calor do sol e o chamado da aventura.
            Conecte-se com a natureza, descubra novos horizontes e viva
            experiências únicas que ficarão para sempre na memória.
          </p>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-blue-500 text-white text-lg rounded-full shadow-md hover:bg-blue-600 transition"
          >
            Descubra Mais
          </motion.button>
        </div>

        {/* Imagem com moldura artística */}
        <div className="md:w-1/2 relative">
          <div className="w-full h-full max-w-md mx-auto relative z-10">
            <img
              src={savanaImage}
              alt="Explorador na savana"
              className="rounded-3xl shadow-xl object-cover"
              style={{
                clipPath: 'url("#mask")',
              }}
            />
            {/* Máscara SVG */}
            <svg className="hidden">
              <defs>
                <clipPath id="mask" clipPathUnits="objectBoundingBox">
                  <path d="M0.05,0.2 C0.1,-0.05,0.9,-0.05,0.95,0.2 C1,0.4,1,0.6,0.95,0.8 C0.9,1.05,0.1,1.05,0.05,0.8 C0,0.6,0,0.4,0.05,0.2 Z" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Modal Moderno */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full mx-auto shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto relative"
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

              {/* Header Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={savanaImage}
                  alt="Safari na savana"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Experiência Safari Africano
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
                    África Oriental & Austral
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Description */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Embarque numa jornada inesquecível pela savana africana.
                    Observe os Big 5 em seu habitat natural, testemunhe
                    migrações espetaculares e conecte-se com a natureza mais
                    selvagem do planeta. Uma experiência que mudará sua
                    perspectiva sobre a vida.
                  </p>
                </div>

                {/* Safari Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      🦁 O que você verá:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Leões, leopardos e guepardos
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Elefantes e rinocerontes
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Búfalos e hipopótamos
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Girafas, zebras e gazelas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ✨ Experiências únicas:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Game drives no nascer do sol
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Caminhadas com guias Maasai
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Acampamentos sob as estrelas
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Visita a comunidades locais
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destinations */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    🌍 Destinos disponíveis:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl mb-2">🇰🇪</div>
                      <h4 className="font-semibold text-gray-800">Quênia</h4>
                      <p className="text-sm text-gray-600">Masai Mara</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl mb-2">🇹🇿</div>
                      <h4 className="font-semibold text-gray-800">Tanzânia</h4>
                      <p className="text-sm text-gray-600">Serengeti</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-2xl mb-2">🇿🇦</div>
                      <h4 className="font-semibold text-gray-800">
                        África do Sul
                      </h4>
                      <p className="text-sm text-gray-600">Kruger Park</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Pronto para a aventura da sua vida?
                  </h3>
                  <p className="text-amber-100 mb-6">
                    Entre em contato conosco e planeje seu safari dos sonhos!
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3 mx-auto"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388" />
                    </svg>
                    <span>Fale conosco no WhatsApp</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Savan;
