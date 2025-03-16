import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import cruise from "./assets/images/cruise/cruzeiro.mp4";
import CruiseCard from "./assets/cruise/CruiseCard";

const Cruise = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video
            className="w-full h-full object-cover"
            src={cruise}
            autoPlay
            loop
            muted
          />
        </div>

        {/* Container Flexbox para organizar os elementos */}
        <div className="relative z-10 flex items-center justify-between px-8 py-12 h-screen">
          {/* Carrossel dentro de uma div semi-transparente à esquerda */}
          <div className="bg-white/2 backdrop-blur-sm p-6 rounded-lg ml-12 shadow-lg w-1/2">
            <CruiseCard />
          </div>

          {/* Texto centralizado à direita com fundo semi-transparente */}
          <div className="font-poppins relative bg-black/50 backdrop-blur-sm p-6 rounded-lg text-right text-gray-100 max-w-lg mr-20 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-semibold">
              Explore Nossos Cruzeiros
            </h1>
            <p className="font-poppins mt-4 text-lg">
              Descubra as melhores opções de cruzeiros para sua próxima viagem.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cruise;
