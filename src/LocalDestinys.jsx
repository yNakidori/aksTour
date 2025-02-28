import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import lencois from "./assets/images/lencois.png";
import NationalCard from "./assets/destinys/nationalCard";

const LocalDestinys = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${lencois})` }}
      >
        <div className="container mx-auto px-6 relative z-10 flex items-start gap-8">
          {/* Texto à esquerda */}
          <div className="w-1/2 mt-52">
            <h2 className="text-4xl font-bold text-black">
              <span className="flex items-center gap-2 font-poppins text-blue-600">
                🧳 Pacotes
              </span>
            </h2>
            <p className="text-lg text-yellow-400 font-poppins">
              Promoções imperdíveis
            </p>
            <h1 className="text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Uma seleção de pacotes para suas <br /> próximas férias
            </h1>
          </div>
          {/* Cards à direita */}
          <div className="w-1/2 mt-52">
            <NationalCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LocalDestinys;
