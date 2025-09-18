import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import turquia from "./assets/images/turquia.jpg";
import InternationalCard from "./assets/destinys/internationalCard";
import Services from "./assets/destinys/services";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const InternationalDestinys = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá!`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${turquia})` }}
      >
        <Navbar />

        {/* Hero Section */}
        <div className="container mx-auto px-6 relative z-10 pt-20 md:pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl text-white font-extrabold font-poppins mb-4">
              Destinos Internacionais
            </h1>
            <p className="text-xl text-blue-200 font-poppins mb-2">
              Explore o mundo com a AKS
            </p>
            <p className="text-lg text-gray-300 font-poppins">
              Pacotes e passagens para destinos incríveis
            </p>
          </div>
        </div>

        {/* Seção de Pacotes */}
        <div className="container mx-auto px-6 relative z-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 font-poppins mb-4">
              <span className="flex items-center justify-center gap-3">
                🧳 Pacotes Internacionais
              </span>
            </h2>
            <p className="text-lg text-white font-poppins">
              Promoções imperdíveis para suas próximas férias
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-400 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <InternationalCard filterType="package" />
          </div>
        </div>

        {/* Seção de Passagens */}
        <div className="container mx-auto px-6 relative z-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-200 font-poppins mb-4">
              <span className="flex items-center justify-center gap-3">
                ✈️ Passagens Internacionais
              </span>
            </h2>
            <p className="text-lg text-gray-400 font-poppins">
              Passagens com preços imbatíveis saindo de São Paulo
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <InternationalCard filterType="ticket" />
          </div>
        </div>

        {/* Seção de Serviços */}
        <div className="container mx-auto px-6 relative z-10 py-16 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 font-poppins mb-4">
              <span className="flex items-center justify-center gap-3">
                🌟 Explore o Mundo com a AKS
              </span>
            </h2>
            <p className="text-lg text-yellow-400 font-poppins">
              Serviços completos para sua viagem perfeita
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <Services />
          </div>
        </div>
      </div>

      {/* Botão WhatsApp */}
      <div
        className="fixed bottom-5 right-5 z-50"
        onClick={handleWhatsAppClick}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      <Footer />
    </div>
  );
};

export default InternationalDestinys;
