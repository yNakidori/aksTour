import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import bus from "./assets/images/bus/onibus.png";
import Services from "./assets/destinys/services";

const Bus = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bus})` }}
      >
        {/* Texto principal no topo */}
        <div className="absolute inset-0 flex justify-center">
          <h2 className="text-3xl font-poppins font-bold text-center text-white tracking-wide mt-32">
            Viaje de ônibus com conforto e preços acessíveis
          </h2>
        </div>

        {/* Primeira seção com texto à esquerda e cards à direita */}
        <div className="container mx-auto px-6 relative z-10 flex items-start gap-8">
          {/* Texto à esquerda */}
          <div className="w-1/2 mt-52">
            <h2 className="text-4xl font-bold text-black">
              <span className="flex items-center gap-2 font-poppins text-blue-600">
                🚌 Pacotes de Ônibus
              </span>
            </h2>
            <p className="text-lg text-yellow-400 font-poppins">
              Promoções exclusivas para viagens de ônibus
            </p>
            <h1 className="text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Descubra destinos incríveis com preços acessíveis
            </h1>
          </div>
          {/* Cards à direita */}
          <div className="w-1/2 mt-52"></div>
        </div>

        {/* Segunda seção com texto à direita e cards à esquerda */}
        <div className="container mx-auto px-6 relative z-10 flex items-start gap-8">
          {/* Cards à esquerda */}
          <div className="w-1/2 mt-52"></div>

          {/* Texto à direita */}
          <div className="w-1/2 mt-52">
            <h2 className="text-4xl font-bold text-black"></h2>
            <p className="text-lg text-blue-700 font-poppins">
              Saindo de São Paulo
            </p>
            <h1 className="text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Passagens com preços imbatíveis
            </h1>
          </div>
        </div>

        {/* Terceira seção com texto à esquerda e cards à direita */}
        <div className="container mx-auto px-6 relative z-10 flex items-start gap-8">
          {/* Texto à esquerda */}
          <div className="w-1/2 mt-52">
            <h2 className="text-4xl font-bold text-black">
              <span className="text-lg text-yellow-400 font-poppins">
                🚌 Explore o Brasil com a AKS
              </span>
            </h2>
            <h1 className="text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Descubra os melhores pacotes para suas próximas viagens
            </h1>
          </div>
          {/* Cards à direita */}
          <div className="w-1/2 mt-52">
            <Services />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bus;
