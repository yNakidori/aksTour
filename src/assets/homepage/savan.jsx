import React from "react";
import savanaImage from "../images/safari.png";

const Savan = () => {
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
          <button className="mt-8 px-8 py-3 bg-blue-500 text-white text-lg rounded-full shadow-md hover:bg-blue-600 transition">
            Descubra Mais
          </button>
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
    </>
  );
};

export default Savan;
