import React from "react";
import paris from "../images/tour-paris.png";
import roma from "../images/tour-roma.png";
import amsterdam from "../images/tour-amsterdam.png";

const EuroTuor = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Tour pela Europa
        </h1>
        <div className="h-1 w-20 bg-amber-400 mx-auto mt-3"></div>
        <p className="mt-4 text-lg text-gray-600">
          Explore o melhor da Europa — da arquitetura clássica de Paris aos
          canais encantadores de Amsterdã. Viva experiências inesquecíveis!
        </p>
      </div>

      {/* Galeria de Imagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="relative rounded-xl overflow-hidden shadow-lg group">
          <img
            src={paris}
            alt="Paris"
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 font-semibold">
            Paris, França
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg group">
          <img
            src={roma}
            alt="Roma"
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 font-semibold">
            Roma, Itália
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg group">
          <img
            src={amsterdam}
            alt="Amsterdã"
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 font-semibold">
            Amsterdã, Holanda
          </div>
        </div>
      </div>

      {/* Botão de Ação */}
      <div className="text-center mt-10">
        <button className="px-8 py-3 bg-amber-400 text-white text-lg font-semibold rounded-full shadow hover:bg-amber-500 transition">
          Ver Roteiros
        </button>
      </div>
    </div>
  );
};

export default EuroTuor;
