import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import rio from "./assets/images/rio.jpg";
import NationalCard from "./assets/destinys/nationalCard";
import CustomNationalCard from "./assets/destinys/customNationalCard";
import Services from "./assets/destinys/services";
import Whats from "./assets/whats.json";
import Lottie from "react-lottie";

const LocalDestinys = () => {
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
        style={{ backgroundImage: `url(${rio})` }}
      >
        <Navbar />

        {/* Bloco 1 */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start gap-8">
          {/* Texto à esquerda */}
          <div className="w-full md:w-1/2 mt-20 md:mt-52">
            <h2 className="text-4xl font-bold text-black">
              <span className="flex items-center gap-2 font-poppins text-blue-600">
                🧳 Pacotes
              </span>
            </h2>
            <p className="text-lg text-yellow-400 font-poppins">
              Promoções imperdíveis
            </p>
            <h1 className="text-3xl md:text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Uma seleção de pacotes para suas{" "}
              <br className="hidden md:block" /> próximas férias
            </h1>
          </div>
          {/* Cards à direita */}
          <div className="w-full md:w-1/2 mt-10 md:mt-52">
            <NationalCard />
          </div>
        </div>

        {/* Bloco 2 */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-start gap-8">
          {/* Cards à esquerda */}
          <div className="w-full md:w-1/2 mt-10 md:mt-52">
            <CustomNationalCard />
          </div>

          {/* Texto à direita */}
          <div className="w-full md:w-1/2 mt-20 md:mt-52">
            <p className="text-lg text-blue-700 font-poppins">
              Saindo de São Paulo
            </p>
            <h1 className="text-3xl md:text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Passagens com preços imbatíveis
            </h1>
          </div>
        </div>

        {/* Bloco 3 */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start gap-8 pb-20">
          {/* Texto à esquerda */}
          <div className="w-full md:w-1/2 mt-20 md:mt-52">
            <h2 className="text-4xl font-bold text-black">
              <span className="text-lg text-yellow-400 font-poppins">
                🧳 Explore o Mundo com a AKS
              </span>
            </h2>
            <h1 className="text-3xl md:text-5xl text-amber-400 font-extrabold font-poppins mt-2">
              Uma seleção de pacotes para suas{" "}
              <br className="hidden md:block" /> próximas férias
            </h1>
          </div>
          {/* Cards à direita */}
          <div className="w-full md:w-1/2 mt-10 md:mt-52">
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

export default LocalDestinys;
